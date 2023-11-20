import nodemailer from "nodemailer";

interface IEmailReturn {
  wasSend: boolean;
  detail: unknown;
}

interface IEmailProps {
  from: string;
  to: string;
  body: string;
  subject: string;
}

export default class EmailAdapter {
  static async sendEmail({
    from,
    to,
    body,
    subject,
  }: IEmailProps): Promise<IEmailReturn> {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 587,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    try {
      const result = await transport.sendMail({
        from,
        to,
        subject,
        html: body,
      });
      return {
        wasSend: true,
        detail: result,
      };
    } catch (e) {
      return {
        wasSend: false,
        detail: e,
      };
    }
  }
}
