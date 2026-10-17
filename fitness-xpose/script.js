// Keep the training list focused while retaining native keyboard accessibility.
document.querySelectorAll('.training-options details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (detail.open) document.querySelectorAll('.training-options details').forEach(other => {
      if (other !== detail) other.open = false;
    });
  });
});
