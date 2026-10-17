document.querySelectorAll('.training-list details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (detail.open) document.querySelectorAll('.training-list details').forEach(other => {
      if (other !== detail) other.open = false;
    });
  });
});
