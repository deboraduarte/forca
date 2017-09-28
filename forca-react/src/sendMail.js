// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs


export function mountMessage(data){
    const to = data.to;
    const from = 'contato@agenciaforca.me';
    const subject = data.subject;
    const text = data.text;
    const html = '<span>'+ text + '</span>';
    const msg = {
        to: to,
        from: from,
        subject: subject,
        text: text,
        html: html,
    };
    return msg;
}

//sgMail.send(mountMessage);