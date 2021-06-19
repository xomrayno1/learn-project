import { Modal } from 'antd';

export function confirm(text, onHanldeOk) {
    Modal.confirm({
      title: 'Xác nhận',
      content: `${text}`,
      okText: 'Đồng ý',
      cancelText: 'Huỷ',
      onOk : onHanldeOk
    });
}

function error() {
    Modal.error({
      title: 'This is an error message',
      content: 'some messages...some messages...',
    });
}

export function warning(text) {
    Modal.warning({
      title: 'Cảnh báo',
      content: text,
    });
  }