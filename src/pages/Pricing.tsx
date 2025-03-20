
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, X } from 'lucide-react';

const Pricing = () => {
  const features = [
    { name: "Social accounts", starter: "2", professional: "5", enterprise: "Unlimited" },
    { name: "AI post generation", starter: "10/month", professional: "50/month", enterprise: "Unlimited" },
    { name: "Scheduled posts", starter: "30/month", professional: "100/month", enterprise: "Unlimited" },
    { name: "Analytics dashboard", starter: "Basic", professional: "Advanced", enterprise: "Custom" },
    { name: "Content calendar", starter: false, professional: true, enterprise: true },
    { name: "Guest review integration", starter: false, professional: true, enterprise: true },
    { name: "Team members", starter: "1", professional: "3", enterprise: "Unlimited" },
    { name: "API access", starter: false, professional: false, enterprise: true },
    { name: "Custom branding", starter: false, professional: true, enterprise: true },
    { name: "Dedicated account manager", starter: false, professional: false, enterprise: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 bg-gradient-to-b from-white to-resort-50 min-h-screen"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-resort-800 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-resort-600 max-w-3xl mx-auto">
            Choose the plan that's right for your resort's social media needs
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <Tabs defaultValue="monthly" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                <TabsTrigger value="yearly">Yearly Billing (20% off)</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="monthly">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Starter Plan */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-2">Starter</h3>
                  <div className="text-3xl font-bold text-resort-800 mb-4">$99<span className="text-base font-normal text-resort-600">/month</span></div>
                  <p className="text-sm text-resort-600 mb-6">Perfect for small resorts just getting started with social media</p>
                  <Link to="/dashboard">
                    <Button className="w-full mb-6">Get Started</Button>
                  </Link>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-resort-700">Includes:</p>
                    {[
                      "AI post generation (10/month)",
                      "2 social platforms",
                      "Basic analytics",
                      "Email support"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-ocean-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-resort-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Professional Plan */}
                <div className="bg-white rounded-xl p-6 shadow-md border-2 border-ocean-400 relative -mt-4 md:-mt-6">
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-max bg-ocean-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Professional</h3>
                  <div className="text-3xl font-bold text-resort-800 mb-4">$199<span className="text-base font-normal text-resort-600">/month</span></div>
                  <p className="text-sm text-resort-600 mb-6">Ideal for growing resorts with active social presence</p>
                  <Link to="/dashboard">
                    <Button className="w-full mb-6 bg-ocean-600 hover:bg-ocean-700">Get Started</Button>
                  </Link>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-resort-700">Everything in Starter, plus:</p>
                    {[
                      "AI post generation (50/month)",
                      "5 social platforms",
                      "Advanced analytics",
                      "Priority support",
                      "Content calendar",
                      "Guest review integration"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-ocean-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-resort-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Enterprise Plan */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                  <div className="text-3xl font-bold text-resort-800 mb-4">$399<span className="text-base font-normal text-resort-600">/month</span></div>
                  <p className="text-sm text-resort-600 mb-6">For large resort chains needing comprehensive solutions</p>
                  <Link to="/dashboard">
                    <Button className="w-full mb-6">Get Started</Button>
                  </Link>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-resort-700">Everything in Professional, plus:</p>
                    {[
                      "Unlimited AI post generation",
                      "Unlimited social platforms",
                      "Custom analytics dashboard",
                      "Dedicated account manager",
                      "Custom API integrations",
                      "White-labeled reports",
                      "Team collaboration tools"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-ocean-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-resort-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="yearly">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Yearly plans with 20% discount */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-2">Starter</h3>
                  <div className="text-3xl font-bold text-resort-800 mb-4">$79<span className="text-base font-normal text-resort-600">/month</span></div>
                  <p className="text-xs text-ocean-600 mb-2">Billed annually ($948/year)</p>
                  <p className="text-sm text-resort-600 mb-6">Perfect for small resorts just getting started with social media</p>
                  <Link to="/dashboard">
                    <Button className="w-full mb-6">Get Started</Button>
                  </Link>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-resort-700">Includes:</p>
                    {[
                      "AI post generation (10/month)",
                      "2 social platforms",
                      "Basic analytics",
                      "Email support"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-ocean-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-resort-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md border-2 border-ocean-400 relative -mt-4 md:-mt-6">
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-max bg-ocean-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Professional</h3>
                  <div className="text-3xl font-bold text-resort-800 mb-4">$159<span className="text-base font-normal text-resort-600">/month</span></div>
                  <p className="text-xs text-ocean-600 mb-2">Billed annually ($1,908/year)</p>
                  <p className="text-sm text-resort-600 mb-6">Ideal for growing resorts with active social presence</p>
                  <Link to="/dashboard">
                    <Button className="w-full mb-6 bg-ocean-600 hover:bg-ocean-700">Get Started</Button>
                  </Link>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-resort-700">Everything in Starter, plus:</p>
                    {[
                      "AI post generation (50/month)",
                      "5 social platforms",
                      "Advanced analytics",
                      "Priority support",
                      "Content calendar",
                      "Guest review integration"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-ocean-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-resort-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                  <div className="text-3xl font-bold text-resort-800 mb-4">$319<span className="text-base font-normal text-resort-600">/month</span></div>
                  <p className="text-xs text-ocean-600 mb-2">Billed annually ($3,828/year)</p>
                  <p className="text-sm text-resort-600 mb-6">For large resort chains needing comprehensive solutions</p>
                  <Link to="/dashboard">
                    <Button className="w-full mb-6">Get Started</Button>
                  </Link>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-resort-700">Everything in Professional, plus:</p>
                    {[
                      "Unlimited AI post generation",
                      "Unlimited social platforms",
                      "Custom analytics dashboard",
                      "Dedicated account manager",
                      "Custom API integrations",
                      "White-labeled reports",
                      "Team collaboration tools"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-ocean-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-resort-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-resort-800 mb-6">Compare Features</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-4 font-medium text-resort-700">Feature</th>
                  <th className="text-center py-4 px-4 font-medium text-resort-700">Starter</th>
                  <th className="text-center py-4 px-4 font-medium text-resort-700">Professional</th>
                  <th className="text-center py-4 px-4 font-medium text-resort-700">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b border-gray-50">
                    <td className="py-4 px-4 text-sm text-resort-800">{feature.name}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof feature.starter === 'boolean' ? (
                        feature.starter ? 
                          <CheckCircle className="h-5 w-5 text-ocean-500 mx-auto" /> : 
                          <X className="h-5 w-5 text-gray-300 mx-auto" />
                      ) : (
                        <span className="text-sm text-resort-700">{feature.starter}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof feature.professional === 'boolean' ? (
                        feature.professional ? 
                          <CheckCircle className="h-5 w-5 text-ocean-500 mx-auto" /> : 
                          <X className="h-5 w-5 text-gray-300 mx-auto" />
                      ) : (
                        <span className="text-sm text-resort-700">{feature.professional}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof feature.enterprise === 'boolean' ? (
                        feature.enterprise ? 
                          <CheckCircle className="h-5 w-5 text-ocean-500 mx-auto" /> : 
                          <X className="h-5 w-5 text-gray-300 mx-auto" />
                      ) : (
                        <span className="text-sm text-resort-700">{feature.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-resort-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-resort-800 mb-4">Need a custom solution?</h2>
          <p className="text-resort-600 mb-6">
            Contact our team to discuss your resort's specific requirements and get a tailored quote.
          </p>
          <Button size="lg" className="bg-resort-800 hover:bg-resort-900">
            Contact Sales
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Pricing;
