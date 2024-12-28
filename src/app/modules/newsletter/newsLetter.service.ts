import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { NewsLetter } from './newsLetter.model';
import mailchimp from './newsLetter.utils';

const joinNewsletter = async (email: string): Promise<any> => {
  const existingEmail = await NewsLetter.findOne({ email });
  if (existingEmail) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Email already exists in the newsletter.'
    );
  }
  const newsLetter = await NewsLetter.create({ email });
  await mailchimp.lists.addListMember('c5500a9761', {
    email_address: email,
    status: 'subscribed',
  });
  return newsLetter;
};

const sendNewsLetterMessage = async (
  subject: string,
  content: string
): Promise<any> => {
  const subscribers = await NewsLetter.find().select('email');
  const emails = subscribers.map(sub => sub.email);

  
  if (emails.length === 0) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'No subscribers found to send newsletter.'
    );
  }

  const response = await mailchimp.campaigns.create({
    type: 'regular',
    recipients: {
      list_id: 'c5500a9761',
    },
    settings: {
      subject_line: subject,
      title: 'Promotional Campaign',
      from_name: 'Horticulture Specialist',
      reply_to: 'horticulturespecialists@gmail.com',
    },
  });
  if ('id' in response) {
    await mailchimp.campaigns.setContent(response.id, {
      html: content,
    });

    await mailchimp.campaigns.send(response.id);

    return response;
  } else {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to create campaign.'
    );
  }
};

export const NewsLetterService = {
  joinNewsletter,
  sendNewsLetterMessage,
};
