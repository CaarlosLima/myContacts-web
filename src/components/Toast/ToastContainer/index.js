import { useCallback, useEffect, useState } from 'react';
import { toastEventManager } from 'utils/toast';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
  }, []);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevMessages) => [...prevMessages, {
        id: Math.random(), type, text, duration,
      }]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage key={message.id} message={message} onRemoveMessage={handleRemoveMessage} />
      ))}
    </Container>
  );
}
