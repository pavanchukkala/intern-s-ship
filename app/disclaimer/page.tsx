
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | kegth',
  description: 'Please read the disclaimer for kegth. We provide information on internships but are not responsible for the accuracy of third-party listings.',
};

const DisclaimerPage = () => {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Disclaimer
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg mx-auto text-gray-700">
          <h2 className="font-semibold text-2xl text-gray-900">General Information</h2>
          <p>
            The information provided by kegth ("we," "us," or "our") on this website is for general informational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
          </p>

          <h2 className="font-semibold text-2xl text-gray-900 mt-8">External Links Disclaimer</h2>
          <p>
            This website may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties or links to websites and features. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
          </p>
          <p>
            We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site or any website or feature linked in any banner or other advertising. We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services.
          </p>

          <h2 className="font-semibold text-2xl text-gray-900 mt-8">Internship & Job Listings</h2>
          <p>
            Kegth is a platform that aggregates internship and job listings from various sources. While we strive to provide high-quality and legitimate opportunities, we do not have direct control over the hiring processes of the companies listed.
          </p>
          <p>
            The inclusion of any internship or job listing on our site does not imply an endorsement or recommendation by kegth. We are not responsible for the content of the job descriptions, the requirements, or the actions of the hiring companies. It is the responsibility of each applicant to conduct their own due diligence before applying for or accepting any position.
          </p>

          <h2 className="font-semibold text-2xl text-gray-900 mt-8">No Professional Advice</h2>
          <p>
            The information provided on this website is not intended to be a substitute for professional career advice. The content on this site, including blog posts, articles, and guides, is for informational purposes only. You should not rely on this information as a primary source for your career decisions.
          </p>
          <p>
            Always seek the advice of a qualified professional for any questions you may have regarding your career path. Relying on any information provided on this site is solely at your own risk.
          </p>

          <h2 className="font-semibold text-2xl text-gray-900 mt-8">Contact Us</h2>
          <p>
            If you have any questions about this disclaimer, please feel free to <a href="/contact" className="text-indigo-600 hover:text-indigo-800">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
