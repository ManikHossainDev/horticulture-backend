import { model, Schema } from 'mongoose';
import { IFaq, IFaqModal } from './faq.interface';
import paginate from '../plugins/paginate';

const faqSchema = new Schema<IFaq>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    isDeleted:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

//apply pagination plugin
faqSchema.plugin(paginate);

const Faq = model<IFaq, IFaqModal>('Faq', faqSchema);
export default Faq;
