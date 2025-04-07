
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Save, Key } from 'lucide-react';

const BSASettingsTab = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showOpenAI, setShowOpenAI] = useState(false);
  const [showAnthropic, setShowAnthropic] = useState(false);
  const [showGemini, setShowGemini] = useState(false);
  const [showDeepseek, setShowDeepseek] = useState(false);
  const [settings, setSettings] = useState({
    openai_api_key: '',
    anthropic_api_key: '',
    gemini_api_key: '',
    deepseek_api_key: '',
    default_llm: 'openai',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('bsa_user_settings')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          setSettings({
            openai_api_key: data.openai_api_key || '',
            anthropic_api_key: data.anthropic_api_key || '',
            gemini_api_key: data.gemini_api_key || '',
            deepseek_api_key: data.deepseek_api_key || '',
            default_llm: data.default_llm || 'openai',
          });
        }
      } catch (error) {
        console.error('Error fetching user settings:', error);
        toast({
          title: 'Error',
          description: 'Failed to load settings. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [user, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      // Check if settings row exists
      const { data: existingSettings, error: fetchError } = await supabase
        .from('bsa_user_settings')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

      let error;
      if (existingSettings) {
        // Update existing settings
        const { error: updateError } = await supabase
          .from('bsa_user_settings')
          .update({
            openai_api_key: settings.openai_api_key,
            anthropic_api_key: settings.anthropic_api_key,
            gemini_api_key: settings.gemini_api_key,
            deepseek_api_key: settings.deepseek_api_key,
            default_llm: settings.default_llm,
          })
          .eq('user_id', user.id);
        
        error = updateError;
      } else {
        // Insert new settings
        const { error: insertError } = await supabase
          .from('bsa_user_settings')
          .insert({
            user_id: user.id,
            openai_api_key: settings.openai_api_key,
            anthropic_api_key: settings.anthropic_api_key,
            gemini_api_key: settings.gemini_api_key,
            deepseek_api_key: settings.deepseek_api_key,
            default_llm: settings.default_llm,
          });
        
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: 'Settings saved',
        description: 'Your settings have been successfully saved.',
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6ad4e0]"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-6">LLM API Settings</h3>

        <div className="space-y-6">
          <div>
            <Label htmlFor="default_llm">Default LLM Provider</Label>
            <Select
              value={settings.default_llm}
              onValueChange={(value) => setSettings((prev) => ({ ...prev, default_llm: value }))}
              disabled={isSaving}
            >
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue placeholder="Select LLM provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI (GPT-4o)</SelectItem>
                <SelectItem value="anthropic">Anthropic (Claude 3 Opus)</SelectItem>
                <SelectItem value="gemini">Google (Gemini Pro)</SelectItem>
                <SelectItem value="deepseek">DeepSeek</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-1">
              Select which LLM provider to use for generating BSA reports
            </p>
          </div>

          <div>
            <Label htmlFor="openai_api_key" className="flex items-center gap-2">
              <Key className="h-4 w-4" /> OpenAI API Key
            </Label>
            <div className="relative">
              <Input
                id="openai_api_key"
                name="openai_api_key"
                type={showOpenAI ? "text" : "password"}
                value={settings.openai_api_key}
                onChange={handleInputChange}
                placeholder="Enter your OpenAI API key"
                className="w-full md:w-[400px] pr-10"
                disabled={isSaving}
              />
              <button
                type="button"
                onClick={() => setShowOpenAI(!showOpenAI)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showOpenAI ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Get your OpenAI API key
              </a>
            </p>
          </div>

          <div>
            <Label htmlFor="anthropic_api_key" className="flex items-center gap-2">
              <Key className="h-4 w-4" /> Anthropic API Key
            </Label>
            <div className="relative">
              <Input
                id="anthropic_api_key"
                name="anthropic_api_key"
                type={showAnthropic ? "text" : "password"}
                value={settings.anthropic_api_key}
                onChange={handleInputChange}
                placeholder="Enter your Anthropic API key"
                className="w-full md:w-[400px] pr-10"
                disabled={isSaving}
              />
              <button
                type="button"
                onClick={() => setShowAnthropic(!showAnthropic)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showAnthropic ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Get your Anthropic API key
              </a>
            </p>
          </div>

          <div>
            <Label htmlFor="gemini_api_key" className="flex items-center gap-2">
              <Key className="h-4 w-4" /> Google Gemini API Key
            </Label>
            <div className="relative">
              <Input
                id="gemini_api_key"
                name="gemini_api_key"
                type={showGemini ? "text" : "password"}
                value={settings.gemini_api_key}
                onChange={handleInputChange}
                placeholder="Enter your Google AI Studio API key"
                className="w-full md:w-[400px] pr-10"
                disabled={isSaving}
              />
              <button
                type="button"
                onClick={() => setShowGemini(!showGemini)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showGemini ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Get your Google AI Studio API key
              </a>
            </p>
          </div>

          <div>
            <Label htmlFor="deepseek_api_key" className="flex items-center gap-2">
              <Key className="h-4 w-4" /> DeepSeek API Key
            </Label>
            <div className="relative">
              <Input
                id="deepseek_api_key"
                name="deepseek_api_key"
                type={showDeepseek ? "text" : "password"}
                value={settings.deepseek_api_key}
                onChange={handleInputChange}
                placeholder="Enter your DeepSeek API key"
                className="w-full md:w-[400px] pr-10"
                disabled={isSaving}
              />
              <button
                type="button"
                onClick={() => setShowDeepseek(!showDeepseek)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showDeepseek ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              <a href="https://platform.deepseek.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Get your DeepSeek API key
              </a>
            </p>
          </div>

          <div className="pt-4">
            <Button 
              onClick={handleSaveSettings}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> 
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" /> Save Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BSASettingsTab;
