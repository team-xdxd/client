import { toast, Zoom } from 'react-toastify';

const toastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  transition: Zoom
  // className: 'black-background',
  // bodyClassName: "grow-font-size",
  // progressClassName: 'fancy-progress-bar'
};

export default {
  success: (message) => {
    toast.success(message, toastOptions);
  },

  error: (message) => {
    toast.error(message, toastOptions);
  }
};