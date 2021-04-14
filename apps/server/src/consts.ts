const address =
  process.env.NODE_ENV === "production"
    ? "https://book-searcher.vercel.app"
    : "http://localhost:8080";

export const mailOptions = {
  activate: {
    subject: "Aktywacja konta",
    html: (
      name: string,
      token: string,
    ) => `<h1>Cześć, ${name}!</h1><span>Wygląda na to, że jeszcze nie aktywowałeś swojego konta. Kliknij w poniższy link, by to zrobić: </span> <br/>${
      address + "/aktywacja/" + token
    }<br/> <h4>To 
    takie proste!</h4><span>Jeśli nie zakładałeś konta w naszej aplikacji zignoruj tą wiadomość.</span>`,
  },
  resetPassword: {
    subject: "Zmiana hasła",
    html: (name: string, token: string) =>
      `<h1>Cześć, ${name}!</h1><span>Oto twój link do przywracania hasła: </span> <br/>${
        address + "/zapomnialem-hasla/" + token
      }`,
  },
};
