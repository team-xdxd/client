import swal from 'sweetalert2'

export default {
  openConfirmation: (message, title, confirmText) => (
    swal.fire({
      title: title || 'Confirm action',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmText || 'Confirm',
      cancelButtonText: 'Cancel'
    }))
}
