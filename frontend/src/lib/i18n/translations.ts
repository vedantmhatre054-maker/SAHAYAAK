import type { LanguageCode } from "./config";

export type TranslationKey =
  | "dashboard"
  | "welcomeBack"
  | "yourOverview"
  | "farmAtAGlance"
  | "weather"
  | "market"
  | "quickActions"
  | "exploreCrops"
  | "checkMarkets"
  | "askSahayakAI"
  | "gettingStarted"
  | "profile"
  | "preferredLanguage"
  | "saveAndContinue"
  | "farmer"
  | "farm"
  | "activeCrops"
  | "viewDetails"
  | "temperature"
  | "humidity"
  | "rainfall"
  | "windSpeed"
  | "noFarmConfigured"
  | "setupFarm"
  | "viewProfile"
  | "marketPrices"
  | "cropManagement"
  | "aiAssistant"
  | "smartFarming"
  | "farmerDashboard"
  | "farmProfile"
  | "farmInformation"
  | "location"
  | "landArea"
  | "waterSource"
  | "irrigation"
  | "currentConditions"
  | "marketIntelligence"
  | "farmConfigured"
  | "notConfigured"
  | "manageFarm"
  | "manageFarmInfo"
  | "startSetup"
  | "addFarmDetails"
  | "viewCrops"
  | "cropRecommendations"
  | "viewMarket"
  | "marketOpportunities"
  | "askAI"
  | "farmingGuidance"
  | "completeFarmProfile"
  | "setupProgress"
  | "needFarmingGuidance"
  | "mainMenu"
  | "myFarm"
  | "cropsAndFarming"
  | "marketAndSelling"
  | "schemesAndLoans"
  | "transport"
  | "mandiAndGodown"
  | "marketplace"
  | "auction"
  | "salesAndTransactions"
  | "profitAndAnalysis"
  | "farmHistory"
  | "farmerProfile";

type TranslationSet = Record<TranslationKey, string>;

const english: TranslationSet = {
  dashboard: "Dashboard",
  welcomeBack: "Welcome back",
  yourOverview: "Your overview",
  farmAtAGlance: "Farm at a glance",
  weather: "Weather",
  market: "Market",
  quickActions: "Quick actions",
  exploreCrops: "Explore crops",
  checkMarkets: "Check markets",
  askSahayakAI: "Ask SAHAYAAK AI",
  gettingStarted: "Getting started",
  profile: "Profile",
  preferredLanguage: "Preferred language",
  saveAndContinue: "Save and continue",
  farmer: "Farmer",
  farm: "Farm",
  activeCrops: "Active crops",
  viewDetails: "View details",
  temperature: "Temperature",
  humidity: "Humidity",
  rainfall: "Rainfall",
  windSpeed: "Wind speed",
  noFarmConfigured: "No farm configured",
  setupFarm: "Set up your farm",
  viewProfile: "View profile",
  marketPrices: "Market prices",
  cropManagement: "Crop management",
  aiAssistant: "AI Assistant",
  smartFarming: "Smart Farming",
  farmerDashboard: "Farmer dashboard",
  farmProfile: "Farm profile",
  farmInformation: "Farm information",
  location: "Location",
  landArea: "Land area",
  waterSource: "Water source",
  irrigation: "Irrigation",
  currentConditions: "Current conditions",
  marketIntelligence: "Market intelligence",
  farmConfigured: "Farm configured",
  notConfigured: "Not configured",
  manageFarm: "Manage farm",
  manageFarmInfo: "Update your farm information and conditions.",
  startSetup: "Start setup",
  addFarmDetails: "Add land, location, soil and available resources.",
  viewCrops: "View crops",
  cropRecommendations:
    "Get recommendations based on your farm conditions.",
  viewMarket: "Explore market",
  marketOpportunities:
    "Explore market prices and future selling opportunities.",
  askAI: "Ask AI",
  farmingGuidance:
    "Get farming guidance using text, voice and images.",
  completeFarmProfile: "Complete your farm profile",
  setupProgress: "Setup progress",
  needFarmingGuidance: "Need farming guidance?",
  mainMenu: "Main menu",
  myFarm: "My Farm",
  cropsAndFarming: "Crops & Farming",
  marketAndSelling: "Market & Selling",
  schemesAndLoans: "Schemes & Loans",
  transport: "Transport",
  mandiAndGodown: "Mandi & Godown",
  marketplace: "Marketplace",
  auction: "Auction",
  salesAndTransactions: "Sales & Transactions",
  profitAndAnalysis: "Profit & Analysis",
  farmHistory: "Farm History",
  farmerProfile: "Farmer Profile",
};

const hindi: TranslationSet = {
  ...english,
  dashboard: "डैशबोर्ड",
  welcomeBack: "वापसी पर आपका स्वागत है",
  yourOverview: "आपका अवलोकन",
  farmAtAGlance: "खेत की जानकारी",
  weather: "मौसम",
  market: "बाज़ार",
  quickActions: "त्वरित कार्य",
  exploreCrops: "फसलें देखें",
  checkMarkets: "बाज़ार देखें",
  askSahayakAI: "SAHAYAAK AI से पूछें",
  gettingStarted: "शुरुआत करें",
  profile: "प्रोफ़ाइल",
  preferredLanguage: "पसंदीदा भाषा",
  saveAndContinue: "सहेजें और जारी रखें",
  farmer: "किसान",
  farm: "खेत",
  activeCrops: "सक्रिय फसलें",
  viewDetails: "विवरण देखें",
  temperature: "तापमान",
  humidity: "नमी",
  rainfall: "वर्षा",
  windSpeed: "हवा की गति",
  noFarmConfigured: "कोई खेत सेट नहीं है",
  setupFarm: "अपना खेत सेट करें",
  viewProfile: "प्रोफ़ाइल देखें",
  marketPrices: "बाज़ार भाव",
  cropManagement: "फसल प्रबंधन",
  aiAssistant: "AI सहायक",
  smartFarming: "स्मार्ट खेती",
  farmerDashboard: "किसान डैशबोर्ड",
  farmProfile: "खेत की प्रोफ़ाइल",
  farmInformation: "खेत की जानकारी",
  location: "स्थान",
  landArea: "भूमि क्षेत्र",
  waterSource: "जल स्रोत",
  irrigation: "सिंचाई",
  currentConditions: "वर्तमान स्थिति",
  marketIntelligence: "बाज़ार जानकारी",
  farmConfigured: "खेत सेट है",
  notConfigured: "सेट नहीं है",
  manageFarm: "खेत प्रबंधित करें",
  manageFarmInfo: "अपने खेत की जानकारी और स्थितियों को अपडेट करें।",
  startSetup: "सेटअप शुरू करें",
  addFarmDetails: "भूमि, स्थान, मिट्टी और उपलब्ध संसाधन जोड़ें।",
  viewCrops: "फसलें देखें",
  cropRecommendations:
    "अपने खेत की परिस्थितियों के आधार पर सुझाव प्राप्त करें।",
  viewMarket: "बाज़ार देखें",
  marketOpportunities:
    "बाज़ार भाव और भविष्य में बिक्री के अवसर देखें।",
  askAI: "AI से पूछें",
  farmingGuidance:
    "टेक्स्ट, आवाज़ और तस्वीरों के माध्यम से खेती की सलाह प्राप्त करें।",
  completeFarmProfile: "अपनी खेत प्रोफ़ाइल पूरी करें",
  setupProgress: "सेटअप प्रगति",
  needFarmingGuidance: "खेती की सलाह चाहिए?",
  mainMenu: "मुख्य मेनू",
  myFarm: "मेरा खेत",
  cropsAndFarming: "फसल और खेती",
  marketAndSelling: "बाज़ार और बिक्री",
  schemesAndLoans: "योजनाएँ और ऋण",
  transport: "परिवहन",
  mandiAndGodown: "मंडी और गोदाम",
  marketplace: "मार्केटप्लेस",
  auction: "नीलामी",
  salesAndTransactions: "बिक्री और लेनदेन",
  profitAndAnalysis: "लाभ और विश्लेषण",
  farmHistory: "खेत का इतिहास",
  farmerProfile: "किसान प्रोफ़ाइल",
};

const marathi: TranslationSet = {
  ...english,
  dashboard: "डॅशबोर्ड",
  welcomeBack: "पुन्हा स्वागत आहे",
  yourOverview: "तुमचा आढावा",
  farmAtAGlance: "शेताची माहिती",
  weather: "हवामान",
  market: "बाजार",
  quickActions: "जलद कृती",
  exploreCrops: "पिके पहा",
  checkMarkets: "बाजार पहा",
  askSahayakAI: "SAHAYAAK AI ला विचारा",
  gettingStarted: "सुरुवात करा",
  profile: "प्रोफाइल",
  preferredLanguage: "प्राधान्याची भाषा",
  saveAndContinue: "जतन करा आणि पुढे जा",
  farmer: "शेतकरी",
  farm: "शेत",
  activeCrops: "सक्रिय पिके",
  viewDetails: "तपशील पहा",
  temperature: "तापमान",
  humidity: "आर्द्रता",
  rainfall: "पाऊस",
  windSpeed: "वाऱ्याचा वेग",
  noFarmConfigured: "शेताची माहिती सेट केलेली नाही",
  setupFarm: "तुमचे शेत सेट करा",
  viewProfile: "प्रोफाइल पहा",
  marketPrices: "बाजारभाव",
  cropManagement: "पीक व्यवस्थापन",
  aiAssistant: "AI सहाय्यक",
  smartFarming: "स्मार्ट शेती",
  farmerDashboard: "शेतकरी डॅशबोर्ड",
  farmProfile: "शेत प्रोफाइल",
  farmInformation: "शेताची माहिती",
  location: "स्थान",
  landArea: "जमिनीचे क्षेत्रफळ",
  waterSource: "पाण्याचा स्रोत",
  irrigation: "सिंचन",
  currentConditions: "सध्याची परिस्थिती",
  marketIntelligence: "बाजार माहिती",
  farmConfigured: "शेत सेट केले आहे",
  notConfigured: "सेट केलेले नाही",
  manageFarm: "शेत व्यवस्थापित करा",
  manageFarmInfo: "तुमच्या शेताची माहिती आणि परिस्थिती अपडेट करा.",
  startSetup: "सेटअप सुरू करा",
  addFarmDetails:
    "जमीन, स्थान, माती आणि उपलब्ध संसाधनांची माहिती जोडा.",
  viewCrops: "पिके पहा",
  cropRecommendations:
    "तुमच्या शेताच्या परिस्थितीनुसार शिफारसी मिळवा.",
  viewMarket: "बाजार पहा",
  marketOpportunities:
    "बाजारभाव आणि भविष्यातील विक्रीच्या संधी पहा.",
  askAI: "AI ला विचारा",
  farmingGuidance:
    "टेक्स्ट, आवाज आणि प्रतिमांद्वारे शेतीविषयक मार्गदर्शन मिळवा.",
  completeFarmProfile: "तुमचे शेत प्रोफाइल पूर्ण करा",
  setupProgress: "सेटअप प्रगती",
  needFarmingGuidance: "शेतीविषयक मार्गदर्शन हवे आहे?",
  mainMenu: "मुख्य मेनू",
  myFarm: "माझे शेत",
  cropsAndFarming: "पिके आणि शेती",
  marketAndSelling: "बाजार आणि विक्री",
  schemesAndLoans: "योजना आणि कर्ज",
  transport: "वाहतूक",
  mandiAndGodown: "मंडी आणि गोदाम",
  marketplace: "मार्केटप्लेस",
  auction: "लिलाव",
  salesAndTransactions: "विक्री आणि व्यवहार",
  profitAndAnalysis: "नफा आणि विश्लेषण",
  farmHistory: "शेताचा इतिहास",
  farmerProfile: "शेतकरी प्रोफाइल",
};

const bengali: TranslationSet = {
  ...english,
  dashboard: "ড্যাশবোর্ড",
  welcomeBack: "আবার স্বাগতম",
  yourOverview: "আপনার সারসংক্ষেপ",
  farmAtAGlance: "খামারের তথ্য",
  weather: "আবহাওয়া",
  market: "বাজার",
  quickActions: "দ্রুত কাজ",
  exploreCrops: "ফসল দেখুন",
  checkMarkets: "বাজার দেখুন",
  askSahayakAI: "SAHAYAAK AI-কে জিজ্ঞাসা করুন",
  gettingStarted: "শুরু করুন",
  profile: "প্রোফাইল",
  preferredLanguage: "পছন্দের ভাষা",
  saveAndContinue: "সংরক্ষণ করে এগিয়ে যান",
  farmer: "কৃষক",
  farm: "খামার",
  activeCrops: "সক্রিয় ফসল",
  viewDetails: "বিস্তারিত দেখুন",
  temperature: "তাপমাত্রা",
  humidity: "আর্দ্রতা",
  rainfall: "বৃষ্টিপাত",
  windSpeed: "বাতাসের গতি",
  noFarmConfigured: "কোনও খামার সেট করা নেই",
  setupFarm: "আপনার খামার সেট করুন",
  viewProfile: "প্রোফাইল দেখুন",
  marketPrices: "বাজারদর",
  cropManagement: "ফসল ব্যবস্থাপনা",
  aiAssistant: "AI সহায়ক",
  smartFarming: "স্মার্ট কৃষি",
  farmerDashboard: "কৃষক ড্যাশবোর্ড",
  farmProfile: "খামার প্রোফাইল",
  farmInformation: "খামারের তথ্য",
  location: "অবস্থান",
  landArea: "জমির পরিমাণ",
  waterSource: "জলের উৎস",
  irrigation: "সেচ",
  currentConditions: "বর্তমান পরিস্থিতি",
  marketIntelligence: "বাজার তথ্য",
  farmConfigured: "খামার সেট করা হয়েছে",
  notConfigured: "সেট করা হয়নি",
  manageFarm: "খামার পরিচালনা করুন",
  manageFarmInfo: "আপনার খামারের তথ্য ও পরিস্থিতি আপডেট করুন।",
  startSetup: "সেটআপ শুরু করুন",
  addFarmDetails: "জমি, অবস্থান, মাটি ও উপলব্ধ সম্পদের তথ্য যোগ করুন।",
  viewCrops: "ফসল দেখুন",
  cropRecommendations: "আপনার খামারের অবস্থার ভিত্তিতে পরামর্শ পান।",
  viewMarket: "বাজার দেখুন",
  marketOpportunities: "বাজারদর ও ভবিষ্যৎ বিক্রির সুযোগ দেখুন।",
  askAI: "AI-কে জিজ্ঞাসা করুন",
  farmingGuidance: "টেক্সট, ভয়েস ও ছবি ব্যবহার করে কৃষি পরামর্শ পান।",
  completeFarmProfile: "আপনার খামার প্রোফাইল সম্পূর্ণ করুন",
  setupProgress: "সেটআপ অগ্রগতি",
  needFarmingGuidance: "কৃষি পরামর্শ প্রয়োজন?",
  mainMenu: "প্রধান মেনু",
  myFarm: "আমার খামার",
  cropsAndFarming: "ফসল ও কৃষি",
  marketAndSelling: "বাজার ও বিক্রয়",
  schemesAndLoans: "সরকারি প্রকল্প ও ঋণ",
  transport: "পরিবহন",
  mandiAndGodown: "মাণ্ডি ও গুদাম",
  marketplace: "মার্কেটপ্লেস",
  auction: "নিলাম",
  salesAndTransactions: "বিক্রয় ও লেনদেন",
  profitAndAnalysis: "লাভ ও বিশ্লেষণ",
  farmHistory: "খামারের ইতিহাস",
  farmerProfile: "কৃষক প্রোফাইল",
};

const translations: Partial<Record<LanguageCode, TranslationSet>> = {
  en: english,
  hi: hindi,
  mr: marathi,
  bn: bengali,
};

export function getTranslations(
  language: LanguageCode,
): TranslationSet {
  return translations[language] ?? english;
}

export function t(
  language: LanguageCode,
  key: TranslationKey,
): string {
  return getTranslations(language)[key];
}