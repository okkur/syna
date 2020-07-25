const sidebarContent = document.querySelector('.content-sidebar .sticky-top .content-sidebar-body');

if (sidebarContent) {
  const sidebarContentParent = sidebarContent.parentElement;
  const sidebarContentParentPadding = parseInt(getComputedStyle(sidebarContentParent).paddingTop, 10);
  const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'), 10);

  document.addEventListener('scroll', function() {
    const sidebarTop = sidebarContentParent.getBoundingClientRect().top;
    let extraPadding = 0;

    if (sidebarTop <= headerHeight) {
      extraPadding = headerHeight;
    }

    sidebarContentParent.style.setProperty('padding-top', extraPadding + sidebarContentParentPadding + 'px', 'important');
  });
}
