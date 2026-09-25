// Módulo de Apresentação de Localização, Contato e Rodapé (SPEC §§20, 21, 22, 34, 35.30 e 36)
import { company } from "./config.js";
import { buildWhatsAppUrl } from "./whatsapp.js";

/**
 * Utilitário seguro para criação de elementos DOM.
 */
function el(tagName, className, textContent) {
  const node = document.createElement(tagName);
  if (className) node.className = className;
  if (textContent !== undefined && textContent !== null) node.textContent = textContent;
  return node;
}

/**
 * Atualiza o bloco de localização com base nas configurações da empresa.
 * Se o endereço for nulo, garante que NENHUM iframe nem botão Maps seja exibido (SPEC §20 e §35.30).
 * @param {HTMLElement | null} container
 * @param {object} config
 */
export function renderLocation(container, config = company) {
  if (!container) return;

  container.replaceChildren();

  const header = el("div", "location-section__header");
  const title = el("h2", "location-section__title", "Localização e Contato");
  title.id = "titulo-localizacao";
  title.tabIndex = -1;
  const intro = el(
    "p",
    "location-section__intro",
    "Saiba onde estamos situados para planejamento de retiradas diretas ou fale com nossa equipe comercial."
  );
  header.append(title, intro);

  const contentGrid = el("div", "location-section__content");

  // Card do Endereço
  const addressCard = el("div", "location-card");
  const addressTitle = el("h3", "location-card__title", "Endereço da Olaria");

  if (config.address && typeof config.address === "string" && config.address.trim()) {
    // Endereço confirmado (SPEC §20)
    const addressBadge = el("span", "location-card__badge location-card__badge--success", "Confirmado");
    const addressText = el("p", "location-card__address", config.address);
    const mapsLink = el("a", "btn btn--secondary location-card__maps-btn", "Abrir no Google Maps");
    const coordsQuery = config.mapCoords
      ? config.mapCoords
      : encodeURIComponent(config.address);
    mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${coordsQuery}`;
    mapsLink.target = "_blank";
    mapsLink.rel = "noopener noreferrer";

    addressCard.append(addressBadge, addressTitle, addressText, mapsLink);

    // Mapa iframe com loading lazy — apenas quando URL de embed disponível (SPEC §20)
    if (config.mapEmbedUrl) {
      const mapWrapper = el("div", "location-card__map-wrapper");
      const iframe = document.createElement("iframe");
      iframe.src = config.mapEmbedUrl;
      iframe.title = "Mapa de localização da Cerâmica Rio Trombetas";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      mapWrapper.append(iframe);
      addressCard.append(mapWrapper);
    }
  } else {
    // Endereço pendente (estado obrigatório atual - SPEC §20 e §35.30)
    const addressBadge = el("span", "location-card__badge location-card__badge--pending", "Em atualização");
    const pendingText = el("p", "location-card__pending-text", "Endereço em atualização");
    const pendingNote = el(
      "p",
      "location-card__note",
      "O endereço físico definitivo da olaria está em fase de confirmação cadastral. Para orientações detalhadas de acesso e rotas, consulte nosso atendimento comercial pelo WhatsApp."
    );
    addressCard.append(addressBadge, addressTitle, pendingText, pendingNote);
  }

  // Coluna de Contato (WhatsApp e Telefone)
  const contactCol = el("div", "location-contact-col");
  contactCol.id = "contato";

  // Card do WhatsApp
  const whatsappCard = el("article", "contact-card");
  const whatsappBadge = el("span", "contact-card__badge", "Atendimento Rápido");
  const whatsappTitle = el("h3", "contact-card__title", "WhatsApp Comercial");
  const whatsappDesc = el(
    "p",
    "contact-card__description",
    "Nosso canal prioritário para orçamentos, consultas de disponibilidade e alinhamento de pedidos."
  );
  const whatsappAction = el("div", "contact-card__action");
  const whatsappBtn = el("a", "btn btn--primary btn--whatsapp", "Falar pelo WhatsApp");
  whatsappBtn.id = "contact-whatsapp-link";
  whatsappAction.append(whatsappBtn);
  whatsappCard.append(whatsappBadge, whatsappTitle, whatsappDesc, whatsappAction);

  // Card do Telefone
  const phoneCard = el("article", "contact-card");
  const phoneBadge = el("span", "contact-card__badge contact-card__badge--neutral", "Ligação");
  const phoneTitle = el("h3", "contact-card__title", "Telefone de Contato");
  const phoneDesc = el(
    "p",
    "contact-card__description",
    "Para atendimento telefônico convencional durante horário comercial."
  );
  const phoneParagraph = el("p", "contact-card__phone");
  const phoneLink = el("a", "contact-phone-link", config.whatsappDisplay || "93 9165-4576");
  phoneLink.href = `tel:${config.whatsappE164 || "+559391654576"}`;
  phoneParagraph.append(phoneLink);
  phoneCard.append(phoneBadge, phoneTitle, phoneDesc, phoneParagraph);

  contactCol.append(whatsappCard, phoneCard);

  contentGrid.append(addressCard, contactCol);
  container.append(header, contentGrid);
}

/**
 * Atualiza o horário de atendimento no rodapé (SPEC §20 e §22).
 * @param {HTMLElement | null} element
 * @param {object} config
 */
export function updateFooterHours(element = document.querySelector("#footer-hours"), config = company) {
  if (!element) return;
  if (config.openingHours && typeof config.openingHours === "string" && config.openingHours.trim()) {
    element.textContent = config.openingHours;
  }
}

/**
 * Atualiza o ano no elemento de copyright do rodapé (SPEC §22).
 * @param {HTMLElement | null} element
 */
export function updateFooterYear(element = document.querySelector("#current-year")) {
  if (!element) return;
  element.textContent = String(new Date().getFullYear());
}

/**
 * Atualiza os links e contatos nas seções de contato e rodapé (SPEC §21 e §22).
 * @param {object} config
 */
export function updateContactLinks(config = company) {
  const contactWhatsApp = document.querySelector("#contact-whatsapp-link");
  const footerWhatsApp = document.querySelector("#footer-whatsapp-link");

  const url = buildWhatsAppUrl(config.whatsappE164, "");

  if (url) {
    if (contactWhatsApp) {
      contactWhatsApp.href = url;
      contactWhatsApp.target = "_blank";
      contactWhatsApp.rel = "noopener noreferrer";
    }
    if (footerWhatsApp) {
      footerWhatsApp.href = url;
      footerWhatsApp.target = "_blank";
      footerWhatsApp.rel = "noopener noreferrer";
    }
  } else {
    if (contactWhatsApp) {
      contactWhatsApp.removeAttribute("href");
      contactWhatsApp.setAttribute("aria-disabled", "true");
      contactWhatsApp.textContent = `WhatsApp: ${config.whatsappDisplay || "Em atualização"}`;
    }
    if (footerWhatsApp) {
      footerWhatsApp.removeAttribute("href");
      footerWhatsApp.setAttribute("aria-disabled", "true");
      footerWhatsApp.textContent = config.whatsappDisplay || "Em atualização";
    }
  }
}

/**
 * Inicializa os módulos de localização, contato e rodapé.
 */
export function initLocationAndFooter() {
  const locationSection = document.querySelector("#localizacao");
  if (locationSection) {
    renderLocation(locationSection, company);
  }
  updateFooterYear();
  updateContactLinks(company);
  updateFooterHours(document.querySelector("#footer-hours"), company);
}
