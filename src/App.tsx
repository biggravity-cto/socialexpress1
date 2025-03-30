
import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Index from '@/pages/Index'
import Dashboard from '@/pages/Dashboard'
import Calendar from '@/pages/Calendar'
import Campaigns from '@/pages/Campaigns'
import Analytics from '@/pages/Analytics'
import Content from '@/pages/Content'
import MarketIntelligence from '@/pages/MarketIntelligence'
import Messages from '@/pages/Messages'
import Approvals from '@/pages/Approvals'
import Team from '@/pages/Team'
import Settings from '@/pages/Settings'
import NotFound from '@/pages/NotFound'
import Login from '@/pages/Login'
import Posts from '@/pages/Posts'
import Features from '@/pages/Features'
import Pricing from '@/pages/Pricing'
import Blog from '@/pages/Blog'
import Guides from '@/pages/Guides'
import CaseStudies from '@/pages/CaseStudies'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="content" element={<Content />} />
        <Route path="market-intelligence" element={<MarketIntelligence />} />
        <Route path="messages" element={<Messages />} />
        <Route path="approvals" element={<Approvals />} />
        <Route path="team" element={<Team />} />
        <Route path="settings" element={<Settings />} />
        <Route path="login" element={<Login />} />
        <Route path="posts" element={<Posts />} />
        <Route path="features" element={<Features />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="blog" element={<Blog />} />
        <Route path="guides" element={<Guides />} />
        <Route path="case-studies" element={<CaseStudies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
