import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // Para usar SSL/TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  export const sendEmail = async (to: string, subject: string, text: string) => {
    try {
      const info = await transporter.sendMail({
        from: `"Meu App" <${process.env.SMTP_USER}>`, 
        to, 
        subject, 
        text,    
      });
      console.log('Email enviado: ' + info.messageId);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    }
  };