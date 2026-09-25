import { company, commercialTerms } from "./config.js";
import { products } from "./products.js";
import { buildWhatsAppUrl } from "./whatsapp.js";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

function formatCents(cents) {
  return currency.format(cents / 100);
}

export function getProductCardDetails(product, contactE164 = company.whatsappE164) {
  const whatsappUrl = buildWhatsAppUrl(contactE164);

  return {
    quality: product.quality === null ? null : `${product.quality}ª qualidade`,
    dimensions: product.dimensions,
    unitPrice: product.unitPriceCents === null
      ? commercialTerms.pricePendingLabel
      : formatCents(product.unitPriceCents),
    thousandPrice: product.thousandPriceCents === null
      ? null
      : formatCents(product.thousandPriceCents),
    commercialNote: product.quoteEnabled && product.thousandPriceCents !== null
      ? commercialTerms.thousandPriceNote
      : null,
    availability: product.quality === 3
      ? commercialTerms.thirdQualityAvailability
      : null,
    action: product.directContact
      ? {
          label: "Consultar pelo WhatsApp",
          href: whatsappUrl,
          external: whatsappUrl !== null
        }
      : { label: "Solicitar orçamento", href: "#orcamento", external: false }
  };
}

function element(tagName, className, text) {
  const node = document.createElement(tagName);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function createCard(product) {
  const details = getProductCardDetails(product);
  const card = element("article", "product-card");
  card.dataset.productId = product.id;
  if (product.quality === 3) card.classList.add("product-card--consultation");

  const media = element("div", "product-card__media");
  const unavailableImage = () => {
    media.replaceChildren(element("span", "product-card__image-fallback", "Imagem em atualização"));
  };

  if (product.image) {
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = `${product.name}${details.quality ? ` de ${details.quality}` : ""}`;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", unavailableImage, { once: true });
    media.append(image);
  } else {
    unavailableImage();
  }

  const body = element("div", "product-card__body");
  body.append(element("h3", "product-card__title", product.name));
  if (details.quality) body.append(element("p", "product-card__quality", details.quality));
  if (details.dimensions) {
    const label = product.category === "tijolo" ? "Dimensões" : "Características";
    body.append(element("p", "product-card__detail", `${label}: ${details.dimensions}`));
  }
  if (details.availability) {
    body.append(element("p", "product-card__availability", details.availability));
  }

  const pricing = element("div", "product-card__pricing");
  if (product.unitPriceCents !== null) {
    pricing.append(element("p", "product-card__price-label", "Preço unitário de referência"));
  }
  pricing.append(element("p", "product-card__price", details.unitPrice));
  if (details.thousandPrice) {
    pricing.append(element("p", "product-card__thousand-price", `Milheiro: ${details.thousandPrice}`));
  }
  if (details.commercialNote) {
    pricing.append(element("p", "product-card__commercial-note", details.commercialNote));
  }
  body.append(pricing);

  if (details.action.href) {
    const action = element("a", "product-card__action", details.action.label);
    action.href = details.action.href;
    if (details.action.external) {
      action.target = "_blank";
      action.rel = "noopener noreferrer";
    }
    body.append(action);
  } else {
    body.append(element("p", "product-card__contact-pending", "Contato pelo WhatsApp em atualização"));
  }

  card.append(media, body);
  return card;
}

export function initCatalog() {
  const grid = document.querySelector("#catalog-grid");
  if (!grid) return;

  grid.replaceChildren(...products.map(createCard));
  document.querySelector("#catalog-confirmation").textContent = commercialTerms.quoteConfirmationNote;
}
