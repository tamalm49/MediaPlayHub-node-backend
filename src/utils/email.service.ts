import nodemailer from 'nodemailer';
export const mailTransporter = nodemailer.createTransport({
  pool: true,
  service: 'gmail',
  auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASS
  }
});
type attachments = {
  filename: string;
  content: Buffer;
};
export type mail = {
  to: string[];
  subject: string;
  text: string;
  htmlbody?: string;
  cc?: string[];
  bcc?: string[];
  attachments?: attachments[];
};
export const sendEmail = async (mail: mail): Promise<any> => {
  try {
    let info = await mailTransporter.sendMail(mail);
    return info.messageId;
  } catch (error) {
    throw error;
  }
};
