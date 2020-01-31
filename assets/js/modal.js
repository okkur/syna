import $ from "./helpers/jq-helpers";
import ModalTemplate from "./templates/modal";

$("body").append(ModalTemplate);

setTimeout(() => {
  const modal = $(".modal");
  const dialog = $(".modal .modal-dialog");

  function closeDialog() {
    $("body").removeClass("modal-open");
    modal.removeClass("show");
  }

  $('[data-dismiss="modal"]').on("click", closeDialog);

  modal.on("click", e => {
    if (!dialog[0].contains(e.target)) {
      closeDialog();
    }
  });

  (window.syna || (window.syna = {})).showModal = function({
    title,
    subtitle,
    image,
    icon,
    content,
    labels,
    size = ""
  }) {
    $("body").addClass("modal-open");
    modal.addClass("show");
    dialog.$(".title").html(title || "");
    dialog.$(".subtitle").html(subtitle || "");
    if (image) {
      dialog.$("img").removeClass("hidden");
      dialog.$("img")[0].src = image;
    } else {
      dialog.$("img").addClass("hidden");
    }

    if (labels) {
      dialog.$(".badge-container").removeClass("hidden");
      dialog.$(".badge-container").html(labels || "");
    } else {
      dialog.$(".badge-container").addClass("hidden");
    }

    if (icon) {
      dialog.$(".icon-container").removeClass("hidden");
      dialog.$(".icon-container").html(icon.replace(/fa-inverse/g, ""));
    } else {
      dialog.$(".icon-container").addClass("hidden");
    }

    if (content) {
      dialog.$(".modal-body .content").html(content);
      dialog.$(".modal-body .content").removeClass("hidden");
    } else {
      dialog.$(".modal-body .content").addClass("hidden");
    }
    dialog
      .removeClass("md")
      .removeClass("lg")
      .addClass(size);
  };
}, 0);
