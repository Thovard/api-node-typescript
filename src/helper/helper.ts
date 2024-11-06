import { sendEmail } from './emailService';

const seedMail = async (email: string, title: string, text: string) => {
    await sendEmail(
      email,
      title,
      text,
    );
    return;
  };