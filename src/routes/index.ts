import express from 'express';
import { UserRoutes } from '../app/modules/user/user.route';
import { AuthRoutes } from '../app/modules/Auth/auth.route';
import { CategoryRoutes } from '../app/modules/category/category.routes';
import { ProductRoutes } from '../app/modules/product/product.routes';
import { ReviewRoutes } from '../app/modules/review/review.routes';
import { CompanyRoutes } from '../app/modules/company/company.routes';
import { CompanyReviewRoutes } from '../app/modules/companyReview/companyReview.routes';
import { BannerImageRoutes } from '../app/modules/bannerImage/banner.routes';
import { ServiceRoutes } from '../app/modules/service/service.routes';
import { FaqRoutes } from '../app/modules/faq/faq.routes';
import { SettingsRoutes } from '../app/modules/settings/settings.routes';
import { OrderRoutes } from '../app/modules/orders/orders.routes';
import { AdminRoutes } from '../app/modules/admin/admin.routes';
import { SubscriptionRoutes } from '../app/modules/subscription/subscription.routes';
import { ContactRoutes } from '../app/modules/contact/contact.routes';
import { NewsLetterRoutes } from '../app/modules/newsletter/newsLetter.routes';
const router = express.Router();

const apiRoutes = [
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/bannerImage',
    route: BannerImageRoutes,
  },
  {
    path: '/company',
    route: CompanyRoutes,
  },
  {
    path: '/companyReview',
    route: CompanyReviewRoutes,
  },
  {
    path: '/subscription',
    route: SubscriptionRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/service',
    route: ServiceRoutes,
  },
  {
    path: '/faq',
    route: FaqRoutes,
  },
  {
    path: '/settings',
    route: SettingsRoutes,
  },
  {
    path: '/contact',
    route: ContactRoutes,
  },
  {
    path: '/newsletter',
    route: NewsLetterRoutes
  }
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
