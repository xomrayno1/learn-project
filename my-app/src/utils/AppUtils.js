import { Modal, notification } from 'antd';

export function confirm(text, onHanldeOk) {
    Modal.confirm({
      title: 'Xác nhận',
      content: `${text}`,
      okText: 'Đồng ý',
      cancelText: 'Huỷ',
      onOk : onHanldeOk
    });
}

export function warning(text) {
    Modal.warning({
      title: 'Cảnh báo',
      content: text,
    });
}

export const notiError =  (text) => {
  notification.error({
    message: `Lỗi`,
    description: `${text}`,
    placement: 'topRight'
  });
}

export const notiSuccess=  (text) => {
  notification.success({
    message: ` Thành công `,
    description:`${text}`,
    placement: 'topRight'
  });
}