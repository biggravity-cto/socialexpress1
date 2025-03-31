
import React from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const EmailConfirmationHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="bg-green-100 p-3 rounded-full">
        <Mail className="h-10 w-10 text-green-600" />
      </div>
      
      <h2 className="text-xl font-semibold text-resort-800">
        Check your email
      </h2>
      
      <p className="text-resort-500">
        We've sent a confirmation link to your email address. Please check your inbox and click the link to activate your account.
      </p>
      
      <div className="w-full pt-4 border-t border-gray-100 mt-4">
        <div className="flex items-center justify-center gap-2 text-sm text-resort-500">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>A confirmation email has been sent</span>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmationHeader;
