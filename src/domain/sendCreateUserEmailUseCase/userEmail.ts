import EmailAdapter from "@/infra/interfaces/adapters/emailAdapter";
import User from "@/main/entities/user";

export default class UserEmailUseCase {
  constructor() {}

  static async sendAuthLinkEmail(user: User) {
    const body = `<p>Hello ${user.name}</p>,

    <p>
        Congratulations on taking the first step to join our community! To complete the account creation process, we're almost there. All that's left is setting your password.
    </p>
    <p>
        Click on the link below to create your password and validate your account: 
    </p>

    <a href="google.com">
        Validate account
    </a>

    <p>
        After clicking the link, you'll be redirected to a secure page where you can choose a password that ensures security and peace of mind for your account. Remember, a strong password is essential to keep your information protected.
    </p>
    <p>
        If you didn't request this email or have any questions, please contact us immediately.
    </p>
    <p>
        Thank you for joining us! Welcome to our community.
    </p>

    <p>
        Sincerely, 
    </p>
    <p>Chat</p>`;

    return EmailAdapter.sendEmail({
      from: "gfelicio199@gmail.com",
      to: user.email,
      subject: "Confirm Email",
      body,
    });
  }
}
