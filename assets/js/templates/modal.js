const ModalTemplate = `
<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header row mx-0">
        <div class="modal-title col px-0">
          <h5 class="title text-dark"></h5>
          <h6 class="subtitle text-secondary"></h6>
        </div>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <img src="" alt="" class="img-fluid">
      <div class="icon-container pt-4"></div>
      <div class="modal-body p-3">
        <div class="badge-container"></div>
        <div class="content"></div>
      </div>
    </div>
  </div>
</div>
`;

export default ModalTemplate;
