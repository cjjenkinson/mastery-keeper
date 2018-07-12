import nodemailer from 'nodemailer';
import mockTransport from 'nodemailer-mock-transport';
import email from '../src/email';

test('should store configuration options so that they can be asserted against', () => {
  const transport = mockTransport({
    foo: 'bar',
  });

  expect(transport.options.foo).toBe('bar');
});

test('should store emails sent with nodemailer, so that they can be asserted against', () => {
  const transport = mockTransport({
    foo: 'bar',
  });

  const transporter = nodemailer.createTransport(transport);

  transporter.sendMail({
    from: 'sender@address.com',
    to: 'receiver@address.com',
    subject: 'hello',
    text: 'hello world!',
  });

  expect(transport.sentMail.length).toBe(1);
  expect(transport.sentMail[0].data.to).toBe('receiver@address.com');
  expect(transport.sentMail[0].message.content).toBe('hello world!');
});

test('should return an error and not send an email if there is no `to` in the mail data object', () => {
  const transport = mockTransport({
    foo: 'bar',
  });

  const transporter = nodemailer.createTransport(transport);

  transporter.sendMail({
    from: 'sender@address.com',
    subject: 'hello',
    text: 'hello world!',
  });

  expect(transport.sentMail.length).toBe(0);
});

// test('should return email template with data interpolated when passed a data object', () => {
//   // const template = email.createHtmlTemplate(mocks.email);

// });
