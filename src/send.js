import keeper from './index';

const send = async () => {
  try {
    const info = await keeper.sendReport();
    console.log(`Report sent: ${info.messageId}`);
  } catch (err) {
    console.log(err);
  }
};

send();

