import { useState, useEffect, useRef, useCallback } from "react";

// ─── Translations ───
const T = {
  en: {
    appName: "Property Presentations",
    dashboard: "Properties",
    inquiries: "Inquiries",
    analytics: "Analytics",
    newProperty: "New Property",
    editProperty: "Edit Property",
    preview: "Preview",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    back: "Back",
    publish: "Publish",
    draft: "Draft",
    published: "Published",
    propertyType: "Property Type",
    resale: "Resale / Existing",
    development: "Development Project",
    rental: "Rental Property",
    basicInfo: "Basic Information",
    media: "Media & Images",
    details: "Property Details",
    devInfo: "Development Info",
    rentalInfo: "Rental Info",
    units: "Units Table",
    aiTools: "AI Tools",
    mapTab: "Map", mapLocation: "Property Location", mapGeocode: "Find on Map", mapLat: "Latitude", mapLng: "Longitude", mapLandmarks: "Nearby Landmarks", mapAddLandmark: "+ Add Landmark", mapSearchLandmarks: "Auto-Discover", mapDragHint: "Drag pin to adjust",
    previewTab: "Preview",
    propertyName: "Property Name",
    propertyNamePlaceholder: "e.g. Hirafu Panorama Residence",
    price: "Price",
    pricePlaceholder: "e.g. 385000000",
    currency: "Currency",
    location: "Location",
    locationPlaceholder: "e.g. Kutchan-chō, Abuta-gun, Hokkaido",
    landArea: "Land Area (㎡)",
    buildingArea: "Building Area (㎡)",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    zoning: "Zoning",
    coverageRatio: "Building Coverage Ratio (%)",
    floorAreaRatio: "Floor Area Ratio (%)",
    structure: "Structure Type",
    currentStatus: "Current Status",
    features: "Features & Amenities",
    featuresPlaceholder: "Enter features separated by commas",
    description: "Description",
    descriptionPlaceholder: "Property description...",
    heroImages: "Hero Images",
    floorPlan: "Floor Plan",
    galleryImages: "Gallery Images",
    uploadImages: "Click or drag to upload",
    agentName: "Agent Name",
    agentContact: "Agent Contact",
    companyName: "Company Name",
    licenseNo: "License No. (宅建業者番号)",
    developer: "Developer",
    constructionCo: "Construction Company",
    architect: "Architect",
    completionDate: "Completion Date",
    deliveryDate: "Delivery Date",
    constructionStart: "Construction Start",
    timeline: "Construction Timeline",
    addPhase: "Add Phase",
    phaseName: "Phase Name",
    phaseStart: "Start",
    phaseEnd: "End",
    phaseProgress: "Progress %",
    registerInterest: "Register Interest",
    registerInterestDesc: "Interested in this property? Let us know and we'll be in touch.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    preferredLang: "Preferred Language",
    budgetRange: "Budget Range",
    intendedUse: "Intended Use",
    primaryResidence: "Primary Residence",
    vacationHome: "Vacation Home",
    investment: "Investment",
    rentalUse: "Rental Management",
    message: "Message",
    messagePlaceholder: "Any questions or specific requirements...",
    privacyConsent: "I agree to the handling of my personal information",
    submit: "Submit",
    thankYou: "Thank you for your interest!",
    thankYouDesc: "We will contact you shortly.",
    allInquiries: "All Inquiries",
    status: "Status",
    new: "New",
    contacted: "Contacted",
    followUp: "Follow-up",
    converted: "Converted",
    noProperties: "No properties yet",
    noPropertiesDesc: "Create your first property presentation",
    noInquiries: "No inquiries yet",
    exportPdf: "Export PDF",
    shareLink: "Share Link",
    sqm: "sqm",
    tsubo: "tsubo",
    exclusive: "Exclusive Listing",
    constructionTimeline: "Construction Timeline",
    propertyDetails: "Property Details",
    floorPlanLabel: "Floor Plan",
    contactAgent: "Contact Agent",
    viewPresentation: "View Presentation",
    accessTitle: "Access & Location",
    nearestStation: "Nearest Station",
    nearestStationPlaceholder: "e.g. JR Kutchan Station — 15 min drive",
    nearestAttraction: "Nearest Attraction",
    nearestAttractionPlaceholder: "e.g. Niseko Grand Hirafu — Ski-in/Ski-out",
    airportAccess: "Airport Access",
    airportAccessPlaceholder: "e.g. New Chitose Airport — 2.5 hours",
    // Password
    passwordProtection: "Password Protection",
    passwordPlaceholder: "Leave empty for public access",
    enterPassword: "Enter Password",
    passwordRequired: "This listing is password-protected",
    passwordIncorrect: "Incorrect password",
    unlock: "Unlock",
    // Analytics
    totalViews: "Total Views",
    viewsToday: "Today",
    viewsWeek: "This Week",
    uniqueVisitors: "Unique Sessions",
    viewHistory: "View History",
    noViews: "No views recorded yet",
    // Units
    unitTable: "Unit Availability",
    unitNo: "Unit No.",
    unitType: "Type",
    unitArea: "Area (㎡)",
    unitPrice: "Price",
    unitFloor: "Floor",
    unitStatus: "Status",
    unitView: "View/Orientation",
    addUnit: "Add Unit",
    available: "Available",
    reserved: "Reserved",
    sold: "Sold",
    // Rental
    monthlyRent: "Monthly Rent",
    monthlyRentPlaceholder: "e.g. 150000",
    deposit: "Deposit (敷金)",
    depositPlaceholder: "e.g. 2 months",
    keyMoney: "Key Money (礼金)",
    keyMoneyPlaceholder: "e.g. 1 month",
    managementFee: "Management Fee (管理費)",
    managementFeePlaceholder: "e.g. 15000",
    leaseTerm: "Lease Term",
    leaseTermPlaceholder: "e.g. 2 years",
    availableFrom: "Available From",
    petPolicy: "Pet Policy",
    parkingIncluded: "Parking Included",
    furnished: "Furnished",
    yes: "Yes",
    no: "No",
    negotiable: "Negotiable",
    forRent: "For Rent",
    perMonth: "/ month",
    depositLabel: "Deposit",
    keyMoneyLabel: "Key Money",
    mgmtFeeLabel: "Mgmt Fee",
    leaseLabel: "Lease",
    // AI Tools
    generateCatchCopy: "Generate Catch Copy",
    generateSellingPoints: "Generate Selling Points",
    generating: "Generating...",
    catchCopy: "Catch Copy",
    sellingPoints: "Selling Points",
    aiGenerated: "AI-Generated",
    regenerate: "Regenerate",
    applyToDescription: "Apply to Description",
    findComparableRents: "Find Comparable Rents",
    findComparableSales: "Find Comparable Sales",
    searchingRents: "Searching nearby rents...",
    searchingSales: "Searching comparable sales...",
    comparableRents: "Comparable Rents (Reference)",
    comparableSales: "Comparable Sales (Reference)",
    rentCompSource: "Market reference for pricing",
    salesCompSource: "Market reference for pricing",
    noCompsFound: "Enter location and property details to search comparables",
    // Building type
    building: "Whole Building (一棟売り)",
    buildingCategory: "Building Category",
    catResidential: "Residential",
    catRetail: "Retail",
    catOffice: "Office",
    catMixed: "Mixed-Use",
    buildingInfo: "Building Info",
    totalFloors: "Total Floors",
    floorBreakdown: "Floor Breakdown",
    addFloor: "Add Floor",
    floorLabel: "Floor",
    floorArea: "Floor Area (㎡)",
    floorUnits: "Units on Floor",
    floorUsage: "Floor Usage",
    totalBuildingUnits: "Total Units",
    grossFloorArea: "Gross Floor Area",
    netLeasableArea: "Net Leasable Area (㎡)",
    occupancyRate: "Occupancy Rate (%)",
    annualIncome: "Annual Gross Income",
    annualIncomePlaceholder: "e.g. 36000000",
    capRate: "Cap Rate (%)",
    noi: "NOI",
    noiPlaceholder: "e.g. 28000000",
    compLangTab: "Language",
  },
  ja: {
    appName: "物件プレゼンテーション",
    dashboard: "物件一覧",
    inquiries: "お問い合わせ",
    analytics: "アクセス解析",
    newProperty: "新規物件",
    editProperty: "物件編集",
    preview: "プレビュー",
    save: "保存",
    cancel: "キャンセル",
    delete: "削除",
    back: "戻る",
    publish: "公開",
    draft: "下書き",
    published: "公開中",
    propertyType: "物件タイプ",
    resale: "中古・既存物件",
    development: "開発案件",
    rental: "賃貸物件",
    basicInfo: "基本情報",
    media: "画像・メディア",
    details: "物件詳細",
    devInfo: "開発情報",
    rentalInfo: "賃貸情報",
    units: "住戸一覧",
    aiTools: "AIツール",
    mapTab: "地図", mapLocation: "物件所在地", mapGeocode: "地図で検索", mapLat: "緯度", mapLng: "経度", mapLandmarks: "周辺施設", mapAddLandmark: "+ 施設を追加", mapSearchLandmarks: "周辺自動検索", mapDragHint: "ピンをドラッグして位置を調整",
    previewTab: "プレビュー",
    propertyName: "物件名",
    propertyNamePlaceholder: "例：比羅夫パノラマレジデンス",
    price: "販売価格",
    pricePlaceholder: "例：385000000",
    currency: "通貨",
    location: "所在地",
    locationPlaceholder: "例：北海道虻田郡倶知安町",
    landArea: "土地面積 (㎡)",
    buildingArea: "建物面積 (㎡)",
    bedrooms: "寝室数",
    bathrooms: "浴室数",
    zoning: "用途地域",
    coverageRatio: "建ぺい率 (%)",
    floorAreaRatio: "容積率 (%)",
    structure: "構造",
    currentStatus: "現況",
    features: "設備・特徴",
    featuresPlaceholder: "カンマ区切りで入力",
    description: "物件説明",
    descriptionPlaceholder: "物件の説明文...",
    heroImages: "メイン画像",
    floorPlan: "間取り図",
    galleryImages: "ギャラリー画像",
    uploadImages: "クリックまたはドラッグでアップロード",
    agentName: "担当者名",
    agentContact: "連絡先",
    companyName: "会社名",
    licenseNo: "宅建業者番号",
    developer: "事業主",
    constructionCo: "施工会社",
    architect: "設計事務所",
    completionDate: "竣工予定",
    deliveryDate: "引渡予定",
    constructionStart: "着工予定",
    timeline: "工程スケジュール",
    addPhase: "フェーズ追加",
    phaseName: "フェーズ名",
    phaseStart: "開始",
    phaseEnd: "終了",
    phaseProgress: "進捗 %",
    registerInterest: "お問い合わせ",
    registerInterestDesc: "この物件にご興味がございましたら、お気軽にお問い合わせください。",
    name: "お名前",
    email: "メールアドレス",
    phone: "電話番号",
    preferredLang: "ご希望言語",
    budgetRange: "ご予算",
    intendedUse: "ご利用目的",
    primaryResidence: "定住",
    vacationHome: "別荘",
    investment: "投資",
    rentalUse: "賃貸運用",
    message: "メッセージ",
    messagePlaceholder: "ご質問やご要望がございましたら...",
    privacyConsent: "個人情報の取り扱いに同意します",
    submit: "送信",
    thankYou: "お問い合わせありがとうございます",
    thankYouDesc: "担当者より折り返しご連絡いたします。",
    allInquiries: "お問い合わせ一覧",
    status: "ステータス",
    new: "新規",
    contacted: "連絡済",
    followUp: "フォローアップ",
    converted: "成約",
    noProperties: "物件がありません",
    noPropertiesDesc: "最初の物件プレゼンテーションを作成しましょう",
    noInquiries: "お問い合わせはまだありません",
    exportPdf: "PDF出力",
    shareLink: "リンク共有",
    sqm: "㎡",
    tsubo: "坪",
    exclusive: "限定物件",
    constructionTimeline: "工程スケジュール",
    propertyDetails: "物件概要",
    floorPlanLabel: "間取り図",
    contactAgent: "担当者に連絡",
    viewPresentation: "プレゼンテーション表示",
    accessTitle: "アクセス",
    nearestStation: "最寄り駅",
    nearestStationPlaceholder: "例：JR倶知安駅 — 車15分",
    nearestAttraction: "周辺施設",
    nearestAttractionPlaceholder: "例：ニセコグラン・ヒラフ — 直結",
    airportAccess: "空港アクセス",
    airportAccessPlaceholder: "例：新千歳空港 — 2.5時間",
    passwordProtection: "パスワード保護",
    passwordPlaceholder: "空欄で公開",
    enterPassword: "パスワードを入力",
    passwordRequired: "この物件はパスワードで保護されています",
    passwordIncorrect: "パスワードが正しくありません",
    unlock: "解除",
    totalViews: "総閲覧数",
    viewsToday: "本日",
    viewsWeek: "今週",
    uniqueVisitors: "ユニークセッション",
    viewHistory: "閲覧履歴",
    noViews: "閲覧履歴はまだありません",
    unitTable: "住戸一覧",
    unitNo: "号室",
    unitType: "タイプ",
    unitArea: "面積 (㎡)",
    unitPrice: "価格",
    unitFloor: "階数",
    unitStatus: "状況",
    unitView: "向き・眺望",
    addUnit: "住戸追加",
    available: "販売中",
    reserved: "商談中",
    sold: "成約済",
    monthlyRent: "月額賃料",
    monthlyRentPlaceholder: "例：150000",
    deposit: "敷金",
    depositPlaceholder: "例：2ヶ月",
    keyMoney: "礼金",
    keyMoneyPlaceholder: "例：1ヶ月",
    managementFee: "管理費",
    managementFeePlaceholder: "例：15000",
    leaseTerm: "契約期間",
    leaseTermPlaceholder: "例：2年",
    availableFrom: "入居可能日",
    petPolicy: "ペット",
    parkingIncluded: "駐車場",
    furnished: "家具付き",
    yes: "可",
    no: "不可",
    negotiable: "相談",
    forRent: "賃貸",
    perMonth: "/ 月",
    depositLabel: "敷金",
    keyMoneyLabel: "礼金",
    mgmtFeeLabel: "管理費",
    leaseLabel: "契約",
    generateCatchCopy: "キャッチコピー生成",
    generateSellingPoints: "セールスポイント生成",
    generating: "生成中...",
    catchCopy: "キャッチコピー",
    sellingPoints: "セールスポイント",
    aiGenerated: "AI生成",
    regenerate: "再生成",
    applyToDescription: "説明文に適用",
    findComparableRents: "周辺賃料を検索",
    findComparableSales: "周辺売買相場を検索",
    searchingRents: "周辺賃料を検索中...",
    searchingSales: "周辺売買相場を検索中...",
    comparableRents: "周辺賃料相場（参考）",
    comparableSales: "周辺売買相場（参考）",
    rentCompSource: "価格設定の参考資料",
    salesCompSource: "価格設定の参考資料",
    noCompsFound: "所在地と物件情報を入力して検索",
    building: "一棟売り",
    buildingCategory: "建物カテゴリ",
    catResidential: "住居",
    catRetail: "店舗・商業",
    catOffice: "オフィス",
    catMixed: "複合用途",
    buildingInfo: "建物情報",
    totalFloors: "総階数",
    floorBreakdown: "フロア構成",
    addFloor: "フロア追加",
    floorLabel: "階",
    floorArea: "フロア面積 (㎡)",
    floorUnits: "区画数",
    floorUsage: "用途",
    totalBuildingUnits: "総区画数",
    grossFloorArea: "延床面積",
    netLeasableArea: "賃貸可能面積 (㎡)",
    occupancyRate: "稼働率 (%)",
    annualIncome: "年間総収入",
    annualIncomePlaceholder: "例：36000000",
    capRate: "利回り (%)",
    noi: "NOI（純営業収入）",
    noiPlaceholder: "例：28000000",
    compLangTab: "言語",
  },
  zh: {
    appName: "物業展示",
    dashboard: "物業列表",
    inquiries: "客戶詢問",
    analytics: "瀏覽分析",
    newProperty: "新增物業",
    editProperty: "編輯物業",
    preview: "預覽",
    save: "儲存",
    cancel: "取消",
    delete: "刪除",
    back: "返回",
    publish: "發佈",
    draft: "草稿",
    published: "已發佈",
    propertyType: "物業類型",
    resale: "二手／現有物業",
    development: "開發項目",
    rental: "租賃物業",
    basicInfo: "基本資訊",
    media: "圖片與媒體",
    details: "物業詳情",
    devInfo: "開發資訊",
    rentalInfo: "租賃資訊",
    units: "單位列表",
    aiTools: "AI工具",
    mapTab: "地圖", mapLocation: "物業位置", mapGeocode: "地圖搜尋", mapLat: "緯度", mapLng: "經度", mapLandmarks: "周邊設施", mapAddLandmark: "+ 新增設施", mapSearchLandmarks: "自動搜尋周邊", mapDragHint: "拖動標記以調整位置",
    previewTab: "預覽",
    propertyName: "物業名稱",
    propertyNamePlaceholder: "例：比羅夫全景住宅",
    price: "售價",
    pricePlaceholder: "例：385000000",
    currency: "貨幣",
    location: "地址",
    locationPlaceholder: "例：北海道虻田郡俱知安町",
    landArea: "土地面積 (㎡)",
    buildingArea: "建築面積 (㎡)",
    bedrooms: "臥室",
    bathrooms: "浴室",
    zoning: "用途區域",
    coverageRatio: "建蔽率 (%)",
    floorAreaRatio: "容積率 (%)",
    structure: "建築結構",
    currentStatus: "現況",
    features: "設施特色",
    featuresPlaceholder: "以逗號分隔輸入",
    description: "物業說明",
    descriptionPlaceholder: "物業描述...",
    heroImages: "主要圖片",
    floorPlan: "平面圖",
    galleryImages: "圖片集",
    uploadImages: "點擊或拖拽上傳",
    agentName: "負責人",
    agentContact: "聯絡方式",
    companyName: "公司名稱",
    licenseNo: "牌照號碼",
    developer: "開發商",
    constructionCo: "施工公司",
    architect: "建築設計",
    completionDate: "竣工日期",
    deliveryDate: "交付日期",
    constructionStart: "動工日期",
    timeline: "工程時間表",
    addPhase: "新增階段",
    phaseName: "階段名稱",
    phaseStart: "開始",
    phaseEnd: "結束",
    phaseProgress: "進度 %",
    registerInterest: "登記興趣",
    registerInterestDesc: "對此物業感興趣？請留下您的資料，我們將盡快與您聯繫。",
    name: "姓名",
    email: "電郵",
    phone: "電話",
    preferredLang: "偏好語言",
    budgetRange: "預算範圍",
    intendedUse: "用途",
    primaryResidence: "自住",
    vacationHome: "度假屋",
    investment: "投資",
    rentalUse: "出租管理",
    message: "留言",
    messagePlaceholder: "如有任何問題或特別要求...",
    privacyConsent: "我同意個人資料的處理方式",
    submit: "提交",
    thankYou: "感謝您的關注！",
    thankYouDesc: "我們將盡快與您聯繫。",
    allInquiries: "所有詢問",
    status: "狀態",
    new: "新詢問",
    contacted: "已聯絡",
    followUp: "跟進中",
    converted: "已成交",
    noProperties: "尚無物業",
    noPropertiesDesc: "建立您的第一個物業展示",
    noInquiries: "尚無客戶詢問",
    exportPdf: "匯出PDF",
    shareLink: "分享連結",
    sqm: "㎡",
    tsubo: "坪",
    exclusive: "獨家物業",
    constructionTimeline: "工程時間表",
    propertyDetails: "物業概要",
    floorPlanLabel: "平面圖",
    contactAgent: "聯絡負責人",
    viewPresentation: "查看展示",
    accessTitle: "交通位置",
    nearestStation: "最近車站",
    nearestStationPlaceholder: "例：JR俱知安站 — 車程15分鐘",
    nearestAttraction: "周邊設施",
    nearestAttractionPlaceholder: "例：二世古Grand Hirafu — 滑雪直達",
    airportAccess: "機場交通",
    airportAccessPlaceholder: "例：新千歲機場 — 2.5小時",
    passwordProtection: "密碼保護",
    passwordPlaceholder: "留空為公開",
    enterPassword: "輸入密碼",
    passwordRequired: "此物業受密碼保護",
    passwordIncorrect: "密碼錯誤",
    unlock: "解鎖",
    totalViews: "總瀏覽量",
    viewsToday: "今日",
    viewsWeek: "本週",
    uniqueVisitors: "獨立訪客",
    viewHistory: "瀏覽記錄",
    noViews: "尚無瀏覽記錄",
    unitTable: "單位列表",
    unitNo: "單位號",
    unitType: "類型",
    unitArea: "面積 (㎡)",
    unitPrice: "價格",
    unitFloor: "樓層",
    unitStatus: "狀態",
    unitView: "朝向／景觀",
    addUnit: "新增單位",
    available: "可售",
    reserved: "洽談中",
    sold: "已售",
    monthlyRent: "月租",
    monthlyRentPlaceholder: "例：150000",
    deposit: "押金（敷金）",
    depositPlaceholder: "例：2個月",
    keyMoney: "禮金",
    keyMoneyPlaceholder: "例：1個月",
    managementFee: "管理費",
    managementFeePlaceholder: "例：15000",
    leaseTerm: "租期",
    leaseTermPlaceholder: "例：2年",
    availableFrom: "可入住日期",
    petPolicy: "寵物政策",
    parkingIncluded: "含停車位",
    furnished: "附帶家具",
    yes: "可",
    no: "不可",
    negotiable: "可商議",
    forRent: "出租",
    perMonth: "/ 月",
    depositLabel: "押金",
    keyMoneyLabel: "禮金",
    mgmtFeeLabel: "管理費",
    leaseLabel: "租期",
    generateCatchCopy: "生成宣傳標語",
    generateSellingPoints: "生成賣點",
    generating: "生成中...",
    catchCopy: "宣傳標語",
    sellingPoints: "賣點",
    aiGenerated: "AI生成",
    regenerate: "重新生成",
    applyToDescription: "套用至說明",
    findComparableRents: "搜尋周邊租金",
    findComparableSales: "搜尋周邊售價",
    searchingRents: "正在搜尋周邊租金...",
    searchingSales: "正在搜尋周邊售價...",
    comparableRents: "周邊租金參考",
    comparableSales: "周邊售價參考",
    rentCompSource: "定價參考資料",
    salesCompSource: "定價參考資料",
    noCompsFound: "輸入地址和物業資訊後搜尋",
    building: "整棟出售",
    buildingCategory: "建物類別",
    catResidential: "住宅",
    catRetail: "零售商業",
    catOffice: "辦公室",
    catMixed: "複合用途",
    buildingInfo: "建物資訊",
    totalFloors: "總樓層",
    floorBreakdown: "樓層配置",
    addFloor: "新增樓層",
    floorLabel: "樓",
    floorArea: "樓層面積 (㎡)",
    floorUnits: "單位數",
    floorUsage: "用途",
    totalBuildingUnits: "總單位數",
    grossFloorArea: "總樓面面積",
    netLeasableArea: "可出租面積 (㎡)",
    occupancyRate: "出租率 (%)",
    annualIncome: "年總收入",
    annualIncomePlaceholder: "例：36000000",
    capRate: "投資報酬率 (%)",
    noi: "NOI（淨營業收入）",
    noiPlaceholder: "例：28000000",
    compLangTab: "語言",
  },
};

const CURRENCIES = { JPY: "¥", USD: "$", HKD: "HK$", TWD: "NT$" };
const SQM_TO_TSUBO = 0.3025;
const STRUCTURES = ["Reinforced Concrete (RC)", "Steel Reinforced Concrete (SRC)", "Steel Frame", "Wood Frame (木造)", "2×4 Wood Frame", "Light Steel Frame"];
const ZONINGS = ["Cat.1 Low-Rise Residential", "Cat.2 Low-Rise Residential", "Cat.1 Mid-Rise Residential", "Cat.2 Mid-Rise Residential", "Cat.1 Residential", "Cat.2 Residential", "Semi-Industrial", "Commercial", "Quasi-Fire Prevention", "Urbanization Control Area"];
const STATUSES_PROP = ["Vacant", "Occupied", "Under Construction", "Pre-Construction", "Completed"];

const emptyProperty = () => ({
  id: Date.now().toString(),
  type: "development",
  status: "draft",
  name: { en: "", ja: "", zh: "" },
  price: "", currency: "JPY",
  location: { en: "", ja: "", zh: "" },
  landArea: "", buildingArea: "", bedrooms: "", bathrooms: "",
  zoning: "", coverageRatio: "", floorAreaRatio: "", structure: "", currentStatus: "",
  features: "",
  description: { en: "", ja: "", zh: "" },
  heroImages: [], floorPlan: [], galleryImages: [],
  agentName: "", agentContact: "", companyName: "", licenseNo: "",
  developer: "", constructionCo: "", architect: "",
  completionDate: "", deliveryDate: "", constructionStart: "",
  timeline: [
    { name: "Design & Permits", start: "", end: "", progress: 0 },
    { name: "Foundation", start: "", end: "", progress: 0 },
    { name: "Structure", start: "", end: "", progress: 0 },
    { name: "Interior & MEP", start: "", end: "", progress: 0 },
    { name: "Completion", start: "", end: "", progress: 0 },
  ],
  nearestStation: { en: "", ja: "", zh: "" },
  nearestAttraction: { en: "", ja: "", zh: "" },
  airportAccess: { en: "", ja: "", zh: "" },
  password: "",
  views: [],
  units: [],
  // Rental fields
  monthlyRent: "", deposit: "", keyMoney: "", managementFee: "",
  leaseTerm: "", availableFrom: "", petPolicy: "", parkingIncluded: "", furnished: "",
  catchCopy: { en: "", ja: "", zh: "" },
  sellingPoints: { en: "", ja: "", zh: "" },
  rentComps: [],
  // Building fields
  buildingCategory: "residential",
  totalFloors: "",
  floors: [],
  netLeasableArea: "",
  occupancyRate: "",
  annualIncome: "",
  capRate: "",
  noi: "",
  // Map fields
  lat: "", lng: "", landmarks: [],
  createdAt: new Date().toISOString(),
});

// ─── Design Tokens ───
const C = {
  bg: "#0d0b08", bgLight: "#151210", bgCard: "#1a1714", bgInput: "#1e1b17",
  gold: "#c4a470", goldDark: "#a88a56", goldFaint: "rgba(196,164,112,0.15)",
  text: "#e8e4de", textDim: "rgba(232,228,222,0.5)", textFaint: "rgba(232,228,222,0.25)",
  border: "rgba(196,164,112,0.15)", borderFaint: "rgba(196,164,112,0.08)",
  white: "#f5f0e8", danger: "#c44040", success: "#5a9a62", blue: "#4a8ac4",
};
const F = {
  display: "'Playfair Display', Georgia, serif",
  accent: "'Cormorant Garamond', Georgia, serif",
  body: "'Outfit', system-ui, sans-serif",
};
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500;600&family=Outfit:wght@200;300;400;500;600&display=swap');`;

// Reusable logo component
const LOGO_PATHS = ["M159.042,24.491v1.103c-.38,1.902-1.749,4.792-4.031,5.628-.761.304-1.711.342-2.586.647-1.94.723-5.286,2.89-7.264.761,1.407-2.206,4.488-2.32,7.15-4.183,1.027-.723,1.635-1.825,2.89-3.004.799-.723,1.978-2.434,2.776-2.32.647.076.761.799.989,1.331","M152.234,43.62c1.825.951,6.465,2.662,6.351,4.754-.076,1.521-2.168,1.787-4.107,1.445-1.559-.266-2.966-1.141-4.031-1.787-1.103-.685-2.51-1.293-3.803-1.978-.951-.532-3.118-1.521-3.461-2.32-.494-1.179.038-2.852.685-3.08.076,0,.076-.114.228-.114,3.499,0,5.286,1.597,8.138,3.08","M157.254,33.885c.723,3.309-2.244,5.59-5.59,5.857-2.814.228-6.123.076-7.796-1.331,1.255-3.004,6.123-1.711,9.355-2.776,1.559-.494,2.358-1.673,4.031-1.787","M156.151,56.437c.456,1.635-.875,3.841-2.13,4.107-1.445.304-3.004-.913-3.917-1.673-1.103-.913-1.978-1.94-2.776-2.776-1.863-1.902-4.107-4.069-5.248-5.857-.723-1.141-1.445-2.852-1.559-4.526.076-.076.114-.19.114-.342,1.141.456,1.293,2.016,2.13,2.966,1.673,1.94,4.83,2.776,7.682,4.107,2.358,1.103,5.248,2.434,5.705,3.993","M154.592,13.234c1.407,1.065,1.902,3.993,1.103,6.313-.456,1.369-1.863,3.195-3.004,4.64-1.179,1.521-2.662,3.423-4.031,3.651-1.673.266-3.118-.875-3.233-1.978-.228-2.244,3.765-4.107,5.248-6.617,1.293-2.206,1.749-5.4,3.917-5.971","M148.469,61.951c2.054,1.559,5.628,3.613,3.803,7.074-2.168-.076-3.955-1.521-5.59-2.776-4.906-3.727-9.774-9.165-7.91-18.216,0-.19.076-.304.228-.342.076,0,.114.038.114.114,1.369,4.259,2.016,7.036,4.678,10.268,1.179,1.445,2.966,2.586,4.678,3.879","M149.116,5.362c.913,1.635,1.331,3.727,1.331,5.857,0,3.841-1.103,6.655-3.233,8.405-1.179.989-3.461,2.814-5.02,2.434-.57-.152-1.141-.989-1.103-1.445,0-.456.951-1.293,1.559-1.863,1.825-1.825,3.461-3.727,3.689-6.731.19-2.586-.913-5.362-2.13-6.845-1.065-1.293-5.134-3.233-7.036-1.445-.951.913-.494,3.537-.57,5.21-1.559-.57-4.678-2.206-4.678-4.069,0-2.282,4.183-4.564,6.579-4.868h1.559c4.069.608,7.53,2.662,9.051,5.4","M143.868,71.04c.799,1.483,1.635,5.476.228,6.085-1.787.761-4.069-1.749-5.02-2.89-2.396-2.852-4.031-6.921-5.59-10.496-.837-1.978-1.902-4.183-1.902-6.085s1.673-5.248,2.89-5.514c.38-.076,1.255,0,1.445,1.559.228,1.597-.456,1.94-.342,3.537.228,3.233,1.179,5.552,3.118,7.948,1.711,2.092,3.955,3.651,5.134,5.857","M141.548,33.124c.304,2.358-.38,5.895-1.331,8.062-2.016,4.602-6.199,9.051-11.485,9.508-2.89.228-5.628.266-7.492-.989.456-1.673,2.358-2.054,3.803-2.776,2.548-1.293,6.275-3.309,6.693-6.617.304-2.548-.723-6.579-3.689-6.313-1.369.114-2.054,1.749-3.461,1.673-1.825-.152-2.624-3.385-2.358-5.21.342-2.244,2.434-4.221,4.221-5.324,1.635-.989,3.575-1.179,5.705-2.092,2.244-.951,3.423-2.434,5.248-3.423.076,0,.114.114.228.114,1.407,1.369.608,3.613,1.103,5.514.266.951,1.255,1.673,1.559,2.434.304.761.38,1.825.57,2.776.19.951.57,1.902.685,2.662","M138.201,100.095c1.597.989,3.841,3.118.685,3.537-2.13.266-4.45-.456-6.237-.989-1.787-.57-3.499-1.863-5.59-1.673-3.157.342-3.309,3.385-5.705,4.754-2.282-1.255-4.678-4.526-8.253-3.537-1.673.456-2.092,2.51-3.803,2.776.456-1.711,1.027-2.928,2.244-4.069,1.293-1.255,3.613-1.863,3.347-4.183-.114-1.103-1.635-1.559-1.902-2.89-.19-.989.152-1.863.685-2.89,1.559.228,3.004,1.293,4.221,2.206,1.369.989,2.624,2.624,4.45,2.89,1.521.228,3.461-.114,5.362,0,3.993.266,7.492,2.206,10.496,4.069","M135.729,74.881c.418.799,1.065,1.978.989,2.966-.19,3.461-3.917,2.358-5.705.761-3.499-3.118-5.628-8.557-6.465-15.022-.304-2.472-1.559-4.373-1.559-6.731,0-.532.19-1.749.456-1.863,1.293-.418,2.13,1.407,2.89,2.206.913-.608,1.597-1.825,2.776-1.559,1.635.38.951,4.297.989,5.857.076,2.32.304,4.64.913,5.971,1.103,2.434,3.309,4.83,4.678,7.416","M123.255,18.292c.228.19.989.57.685.989-4.031-1.407-9.622-1.293-14.261-2.092-.038-1.027,1.521-1.255.989-2.092-.685-1.141-1.255.647-2.13.647-.989,0-.837-.951-1.559-1.445-.685,1.179-1.027,2.966-2.358,3.118-.989.114-1.863-.951-2.776-1.331-2.32-.913-5.438-.723-7.682-1.331-.608-1.407.913-2.054.456-3.08-.799-1.749-5.895.076-6.921.57-2.168,1.027-4.868,2.7-4.564,5.096.266,1.94,3.499,3.689,5.933,4.754,5.4,2.396,10.268,3.347,14.261,6.959,1.94,1.749,3.271,3.879,4.678,5.857,1.407,1.94,4.754,2.89,6.807,4.982.494.494,1.369,1.483,1.217,2.092-.152.685-2.13,1.445-2.89,1.863s-2.548,1.597-3.118,1.559c-.837,0-.875-.913-1.445-.989-2.244,1.978-7.416,2.13-10.915,1.217-1.407-.38-3.385-1.483-4.906-.228,1.217,3.08,4.297,3.765,7.15,3.993.608.038,1.711.038,2.472,0,3.651-.266,6.047-2.548,9.812-2.966,5.286-.57,7.264,2.168,7.568,6.503.19,2.51.038,5.172-.57,7.416-.723,2.662-3.271,3.689-3.347,6.617-.076,3.233,2.13,5.438,4.031,6.959,1.141.913,2.51,1.369,2.662,2.966.19,1.787-.837,4.069-1.673,5.628-.837,1.559-2.092,3.499-2.89,4.297-.837.875-3.385,2.814-4.792,2.32-.723-.266-.532-1.483-1.103-1.787-.799-.38-1.445.647-2.472.647-2.776.038-2.966-2.966-2.89-6.199-.913-.608-1.597-.532-2.32-.228-.685.304-.951,1.065-1.445,1.331-.875.494-3.803.228-4.678.875-.799.608-.799,2.89-1.103,4.069-.342,1.369-1.027,2.928-2.244,3.004s-1.673-1.293-2.586-1.673c-2.472-.076-4.183.418-5.819-.342-1.597-.761-2.51-3.271-3.118-5.096-.647-1.902-1.521-4.488-1.673-6.389-.19-2.396,1.293-3.803,2.662-5.21,1.065-1.065,2.738-2.206,2.662-3.765-.076-1.521-2.358-3.233-3.233-4.64-1.179-1.902-2.624-5.4-1.902-8.861.723-3.499,2.814-6.541,4.678-8.937,2.092-2.7,5.248-4.792,5.895-7.644.266-1.217.228-2.7-.228-3.879-1.141-2.89-5.172-4.906-8.138-6.959-3.575-2.472-8.214-5.096-7.568-11.143.152-1.483.723-3.004,1.331-3.993,2.814-4.564,10.116-4.335,16.733-3.993.418-1.787-.989-4.069.761-4.868,1.673,2.32,4.145,3.689,7.15,5.172,2.852,1.445,5.248,2.89,9.279,2.548.266.761.304,2.206.114,3.08,3.803.989,8.557,1.673,11.371,3.879","M95.684,105.077c-.913-.114-1.445-.989-2.662-1.217-1.787-.342-4.259-.076-6.237.342-1.94.418-4.107,1.065-4.145,2.548h-.342c-2.32-.723-3.118-3.765-5.705-3.993-2.13-.152-4.145,1.103-6.237,1.749-2.13.685-4.297,1.331-6.807.875.761-2.054,2.244-3.613,3.917-4.754,2.206-1.521,5.21-2.662,8.367-2.662.875,0,1.559.266,2.472.228,3.004-.114,4.602-1.94,6.123-3.765.647-.761,2.168-2.89,3.233-2.776.837.114,1.483,1.787,1.787,2.662.456,1.293.647,2.776.57,3.993,2.016,2.13,4.868,3.423,5.705,6.731","M81.08,49.819c0,.951-3.309,3.993-4.335,4.183-1.978.418-3.917-.837-5.705-1.445-1.902-.647-4.183-1.027-5.476-1.673-2.168-1.065-4.183-3.727-5.705-5.514-.799-.951-1.521-1.978-2.472-3.08-.951-1.141-2.206-2.32-2.358-3.195-.114-.799.494-1.978.456-2.89-.076-.989-.761-1.787-.989-2.662-.494-1.711-.494-4.526.114-5.971.38-.837,1.141-1.711,1.902-2.434.761-.685,1.749-1.217,2.13-2.206.266-.761,0-2.776,1.217-3.195,1.483-.494,4.221,2.016,5.59,2.89,3.537,2.244,6.921,3.841,9.127,7.53,1.103,1.825,3.08,6.085.57,7.302-1.331.647-2.814.076-3.803-.456-1.027-.57-1.673-1.902-2.89-1.978-2.244-.152-3.309,3.537-3.347,5.096-.038,2.776,1.978,6.617,3.917,7.72,1.559.913,4.64,1.521,6.579,1.103,1.141-.228,1.483-1.103,2.776-1.103,1.521,0,2.662,1.217,2.662,1.978","M77.619,55.79c2.966-.685,1.521,7.188,1.331,9.508-.532,6.275-.913,10.801-3.803,14.794-.951,1.331-2.51,3.233-4.45,3.195-1.141,0-2.662-.913-3.004-2.092-.647-2.13.57-4.45,1.559-6.313.723-1.369,1.902-3.271,2.662-5.4.837-2.32,1.369-4.373,1.787-6.313.647-2.966,1.331-5.895,3.689-7.302.076-.038.076-.076.228-.114","M71.801,54.573c1.255,2.548-.494,5.21-1.445,7.416-2.054,4.754-3.993,8.747-7.378,12.588-1.179,1.331-3.499,4.145-5.895,3.993-1.065-.076-2.206-1.179-2.358-1.978-.342-2.244,2.624-4.335,3.689-5.4,1.635-1.597,3.727-3.042,4.678-4.64,1.597-2.624,2.738-4.792,3.917-7.416.951-2.092,1.217-5.096,4.792-4.526","M60.011.837c4.411-.418,9.279,1.331,8.709,5.628-.19,1.483-1.217,2.434-2.244,3.423-.913.875-1.902,1.94-3.347,1.978.076-1.103,1.94-3.955.685-5.628-1.217-1.597-6.123-.304-7.15.342-2.472,1.521-3.841,5.286-2.244,8.633.57,1.179,3.423,3.423,2.548,5.4-.532,1.179-2.244.989-3.233.456-2.13-1.141-3.993-4.259-4.564-6.617-.723-2.966.266-6.921,1.902-8.937,1.597-2.016,5.628-4.335,8.937-4.64","M62.559,53.356c1.825-.342,3.08,2.738,2.13,4.982-.761,1.787-3.08,3.613-5.02,5.514-2.206,2.168-3.955,3.765-5.895,4.64-1.902.837-7.036.799-7.264-1.445-.152-1.787,3.575-4.069,5.134-5.21,1.825-1.293,4.678-2.776,6.237-3.993,1.635-1.255,2.738-3.575,4.45-4.411.076,0,.076-.076.228-.114","M60.886,50.58c.456,1.293-1.407,2.738-2.244,3.423-1.217,1.065-2.282,1.863-3.347,2.548-2.738,1.787-4.792,3.347-8.367,3.309-1.902,0-4.64-.951-4.792-2.434-.152-1.141,1.483-3.309,2.89-3.765,1.94-.608,4.145-.685,6.123-1.445,2.396-.913,3.993-2.13,6.693-2.434.951-.114,2.662-.228,3.004.761","M56.323,45.712c.685,3.004-4.488,3.575-6.351,4.183-3.879,1.293-8.823,2.092-10.61-1.103v-1.217c1.673-3.537,6.959-2.89,11.941-3.08,1.787-.076,4.678-.228,5.02,1.217","M49.515,37.307c1.255.228,3.461,1.978,3.461,3.08,0,.799-.913,1.521-1.787,1.635-1.597.228-2.51-.685-3.575-.989-1.179-.342-2.548-.228-3.689-.761-.913-.456-1.749-1.255-2.358-1.863-.608-.647-1.521-1.635-1.103-2.776,2.396-.837,3.993,1.369,6.921,1.635.685.076,1.445-.114,2.13,0","M52.063,22.172c.456,1.027,1.141,4.64-.114,4.982-.837.228-1.749-1.103-2.472-1.673-.875-.685-1.711-1.255-2.358-1.635-2.738-1.711-6.199-2.624-5.59-7.72.19-1.673,1.483-4.297,2.358-4.754.076,0,.114.038.114.114,1.103,1.103,1.673,2.548,2.548,3.765.875,1.179,1.787,2.244,2.776,3.423.799.913,2.054,2.054,2.662,3.537","M51.531,32.135c.608,4.221-2.814,3.195-5.134,2.092-3.955-1.863-6.579-4.373-7.036-9.165v-.875c.228-.837.114-2.51,1.103-2.662.799-.114,2.662,1.787,3.347,2.32,1.141.837,2.168,1.483,3.233,2.548.951.951,1.407,1.749,2.358,2.776.799.837,1.978,1.94,2.13,2.966","M21.145,141.434c-.494,1.673-1.369,4.297-1.94,5.552-.951.19-4.031.875-6.503.875-8.937,0-12.702-6.085-12.702-11.751,0-7.454,5.552-12.436,13.615-12.436,2.738,0,5.172.685,6.161.913.304,1.978.532,3.499.723,5.666l-1.331.266c-1.103-3.993-3.271-5.286-6.427-5.286-5.172,0-8.1,4.754-8.1,10.116,0,6.503,3.575,10.877,8.367,10.877,3.08,0,4.982-1.787,6.769-5.362l1.369.532v.038Z","M26.355,147.823c-1.331,0-2.358-1.065-2.358-2.472s1.027-2.51,2.396-2.51,2.396,1.065,2.396,2.51-.989,2.472-2.396,2.472h-.038Z","M50.922,147.366v-1.331c2.776-.304,2.89-.456,2.852-3.841l-.076-14.071h-.114l-7.948,18.977h-1.065l-7.264-18.559h-.152l-.418,9.698c-.152,2.966-.152,4.526-.076,5.666.114,1.597.875,1.902,3.233,2.092v1.369h-8.519v-1.369c1.978-.19,2.624-.608,2.852-2.016.228-1.179.418-2.852.685-6.427l.532-7.416c.304-4.107.076-4.373-3.004-4.64v-1.331h6.845l7.074,16.315,7.264-16.315h6.807v1.331c-2.928.266-3.042.38-2.966,3.537l.304,13.12c.076,3.385.19,3.537,3.042,3.841v1.331h-9.926l.038.038Z","M66.477,147.823c-1.331,0-2.358-1.065-2.358-2.472s1.027-2.51,2.396-2.51,2.396,1.065,2.396,2.51-.989,2.472-2.396,2.472h-.038Z","M89.371,124.244c2.7,0,4.64.38,6.123,1.445,1.521,1.027,2.472,2.814,2.472,5.134,0,4.716-3.461,6.96-7.112,7.378-.532.076-1.103.076-1.521.076l-2.472-.647v5.096c0,2.966.304,3.157,3.461,3.385v1.293h-10.382v-1.293c2.7-.228,3.042-.494,3.042-3.385v-13.691c0-3.042-.342-3.233-2.814-3.423v-1.331h9.203v-.038ZM86.861,136.186c.456.19,1.331.38,2.244.38,1.711,0,4.488-1.103,4.488-5.59,0-3.917-2.396-5.286-4.792-5.286-.761,0-1.369.114-1.559.342-.266.228-.38.608-.38,1.369v8.823-.038Z","M109.755,147.366v-1.179c1.825-.228,2.016-.456,2.016-2.548v-6.047c0-2.814-1.103-3.955-2.89-3.955-1.065,0-2.244.418-3.08,1.369v8.633c0,2.092.19,2.32,1.94,2.548v1.179h-8.024v-1.179c2.054-.228,2.32-.38,2.32-2.586v-16.429c0-2.168-.152-2.206-2.168-2.396v-1.179c1.825-.266,4.107-.723,5.933-1.217v11.181c1.217-1.217,3.042-2.396,4.906-2.396,3.004,0,4.868,2.016,4.868,5.971v6.503c0,2.206.266,2.32,2.206,2.586v1.179h-7.986l-.038-.038Z","M127.819,131.128c4.64,0,7.834,3.651,7.834,8.062,0,5.781-4.107,8.633-7.91,8.633-5.248,0-8.1-4.031-8.1-7.948,0-5.971,4.526-8.747,8.138-8.747h.038ZM127.325,132.573c-1.711,0-3.347,2.054-3.347,6.047,0,4.411,1.635,7.758,4.145,7.758,1.711,0,3.233-1.293,3.233-6.275,0-4.526-1.407-7.568-3.993-7.568l-.038.038Z","M151.664,144.172c-2.168,2.928-4.754,3.651-6.161,3.651-4.564,0-7.188-3.537-7.188-7.682,0-2.7,1.141-4.982,2.548-6.465,1.521-1.559,3.423-2.548,5.286-2.548h.038c3.157,0,5.628,2.776,5.59,5.705,0,.761-.152,1.217-.913,1.331-.608.114-5.02.456-8.823.608.076,4.107,2.434,6.085,4.944,6.085,1.445,0,2.738-.494,3.993-1.635l.647.951h.038ZM142.232,137.022c1.711,0,3.271,0,5.02-.114.57,0,.761-.152.761-.723,0-1.825-.989-3.537-2.548-3.537s-2.852,1.673-3.233,4.411v-.038Z","M163.871,147.366v-1.179c1.749-.266,1.94-.418,1.94-2.738v-6.085c0-2.51-.989-3.651-2.738-3.651-1.103,0-2.168.57-3.157,1.445v8.443c0,2.206.152,2.358,1.94,2.586v1.179h-8.138v-1.179c2.244-.304,2.434-.418,2.434-2.662v-7.378c0-2.168-.19-2.282-2.016-2.586v-1.141c1.978-.266,3.993-.723,5.781-1.369v2.7c.647-.494,1.407-1.027,2.244-1.597.989-.647,1.825-1.027,2.852-1.027,2.89,0,4.602,2.092,4.602,5.552v6.921c0,2.206.228,2.32,2.168,2.586v1.179h-7.91Z","M173.569,147.366v-1.179c2.092-.266,2.358-.418,2.358-2.852v-7.112c0-2.282-.19-2.358-2.092-2.662v-1.141c2.054-.266,4.145-.723,5.895-1.331v12.246c0,2.396.19,2.586,2.396,2.852v1.179s-8.557,0-8.557,0ZM175.28,126.45c0-1.331,1.065-2.32,2.282-2.32s2.244.989,2.244,2.32c0,1.179-.951,2.244-2.282,2.244-1.179,0-2.244-1.065-2.244-2.244Z","M191.557,147.366v-1.179c1.407-.228,1.635-.494.989-1.559l-2.054-3.423c-.685,1.065-1.407,2.244-1.94,3.233-.608,1.103-.494,1.407.989,1.711v1.179h-6.693v-1.179c2.016-.342,2.662-.685,3.917-2.244.875-1.103,1.825-2.396,2.89-3.993l-3.004-4.982c-.989-1.673-1.483-1.978-3.347-2.206v-1.255h7.758v1.255c-1.217.19-1.407.494-.837,1.445l1.749,2.852c.723-1.027,1.331-2.054,1.863-2.928.494-.951.304-1.179-.989-1.369v-1.255h6.503v1.255c-2.054.228-2.472.418-3.689,1.749-.761.837-1.559,2.054-2.776,3.803l3.271,5.21c1.217,2.016,2.016,2.434,3.841,2.662v1.179h-8.405l-.038.038Z"];
const CMPLogo = ({width=80,fill=C.gold,style={}}) => (<svg viewBox="0 0 200 148" style={{width,height:"auto",...style}} fill={fill} xmlns="http://www.w3.org/2000/svg">{LOGO_PATHS.map((d,i)=><path key={i} d={d} fillRule="evenodd"/>)}</svg>);

const LOGO_URI = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMDAgMTQ4Ij4KICA8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMjkuNi4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogMi4xLjEgQnVpbGQgMjA3KSAgLS0+CiAgPHBhdGggZD0iTTE1OS4wNDIsMjQuNDkxdjEuMTAzYy0uMzgsMS45MDItMS43NDksNC43OTItNC4wMzEsNS42MjgtLjc2MS4zMDQtMS43MTEuMzQyLTIuNTg2LjY0Ny0xLjk0LjcyMy01LjI4NiwyLjg5LTcuMjY0Ljc2MSwxLjQwNy0yLjIwNiw0LjQ4OC0yLjMyLDcuMTUtNC4xODMsMS4wMjctLjcyMywxLjYzNS0xLjgyNSwyLjg5LTMuMDA0Ljc5OS0uNzIzLDEuOTc4LTIuNDM0LDIuNzc2LTIuMzIuNjQ3LjA3Ni43NjEuNzk5Ljk4OSwxLjMzMSIvPgogIDxwYXRoIGQ9Ik0xNTIuMjM0LDQzLjYyYzEuODI1Ljk1MSw2LjQ2NSwyLjY2Miw2LjM1MSw0Ljc1NC0uMDc2LDEuNTIxLTIuMTY4LDEuNzg3LTQuMTA3LDEuNDQ1LTEuNTU5LS4yNjYtMi45NjYtMS4xNDEtNC4wMzEtMS43ODctMS4xMDMtLjY4NS0yLjUxLTEuMjkzLTMuODAzLTEuOTc4LS45NTEtLjUzMi0zLjExOC0xLjUyMS0zLjQ2MS0yLjMyLS40OTQtMS4xNzkuMDM4LTIuODUyLjY4NS0zLjA4LjA3NiwwLC4wNzYtLjExNC4yMjgtLjExNCwzLjQ5OSwwLDUuMjg2LDEuNTk3LDguMTM4LDMuMDgiLz4KICA8cGF0aCBkPSJNMTU3LjI1NCwzMy44ODVjLjcyMywzLjMwOS0yLjI0NCw1LjU5LTUuNTksNS44NTctMi44MTQuMjI4LTYuMTIzLjA3Ni03Ljc5Ni0xLjMzMSwxLjI1NS0zLjAwNCw2LjEyMy0xLjcxMSw5LjM1NS0yLjc3NiwxLjU1OS0uNDk0LDIuMzU4LTEuNjczLDQuMDMxLTEuNzg3Ii8+CiAgPHBhdGggZD0iTTE1Ni4xNTEsNTYuNDM3Yy40NTYsMS42MzUtLjg3NSwzLjg0MS0yLjEzLDQuMTA3LTEuNDQ1LjMwNC0zLjAwNC0uOTEzLTMuOTE3LTEuNjczLTEuMTAzLS45MTMtMS45NzgtMS45NC0yLjc3Ni0yLjc3Ni0xLjg2My0xLjkwMi00LjEwNy00LjA2OS01LjI0OC01Ljg1Ny0uNzIzLTEuMTQxLTEuNDQ1LTIuODUyLTEuNTU5LTQuNTI2LjA3Ni0uMDc2LjExNC0uMTkuMTE0LS4zNDIsMS4xNDEuNDU2LDEuMjkzLDIuMDE2LDIuMTMsMi45NjYsMS42NzMsMS45NCw0LjgzLDIuNzc2LDcuNjgyLDQuMTA3LDIuMzU4LDEuMTAzLDUuMjQ4LDIuNDM0LDUuNzA1LDMuOTkzIi8+CiAgPHBhdGggZD0iTTE1NC41OTIsMTMuMjM0YzEuNDA3LDEuMDY1LDEuOTAyLDMuOTkzLDEuMTAzLDYuMzEzLS40NTYsMS4zNjktMS44NjMsMy4xOTUtMy4wMDQsNC42NC0xLjE3OSwxLjUyMS0yLjY2MiwzLjQyMy00LjAzMSwzLjY1MS0xLjY3My4yNjYtMy4xMTgtLjg3NS0zLjIzMy0xLjk3OC0uMjI4LTIuMjQ0LDMuNzY1LTQuMTA3LDUuMjQ4LTYuNjE3LDEuMjkzLTIuMjA2LDEuNzQ5LTUuNCwzLjkxNy01Ljk3MSIvPgogIDxwYXRoIGQ9Ik0xNDguNDY5LDYxLjk1MWMyLjA1NCwxLjU1OSw1LjYyOCwzLjYxMywzLjgwMyw3LjA3NC0yLjE2OC0uMDc2LTMuOTU1LTEuNTIxLTUuNTktMi43NzYtNC45MDYtMy43MjctOS43NzQtOS4xNjUtNy45MS0xOC4yMTYsMC0uMTkuMDc2LS4zMDQuMjI4LS4zNDIuMDc2LDAsLjExNC4wMzguMTE0LjExNCwxLjM2OSw0LjI1OSwyLjAxNiw3LjAzNiw0LjY3OCwxMC4yNjgsMS4xNzksMS40NDUsMi45NjYsMi41ODYsNC42NzgsMy44NzkiLz4KICA8cGF0aCBkPSJNMTQ5LjExNiw1LjM2MmMuOTEzLDEuNjM1LDEuMzMxLDMuNzI3LDEuMzMxLDUuODU3LDAsMy44NDEtMS4xMDMsNi42NTUtMy4yMzMsOC40MDUtMS4xNzkuOTg5LTMuNDYxLDIuODE0LTUuMDIsMi40MzQtLjU3LS4xNTItMS4xNDEtLjk4OS0xLjEwMy0xLjQ0NSwwLS40NTYuOTUxLTEuMjkzLDEuNTU5LTEuODYzLDEuODI1LTEuODI1LDMuNDYxLTMuNzI3LDMuNjg5LTYuNzMxLjE5LTIuNTg2LS45MTMtNS4zNjItMi4xMy02Ljg0NS0xLjA2NS0xLjI5My01LjEzNC0zLjIzMy03LjAzNi0xLjQ0NS0uOTUxLjkxMy0uNDk0LDMuNTM3LS41Nyw1LjIxLTEuNTU5LS41Ny00LjY3OC0yLjIwNi00LjY3OC00LjA2OSwwLTIuMjgyLDQuMTgzLTQuNTY0LDYuNTc5LTQuODY4aDEuNTU5YzQuMDY5LjYwOCw3LjUzLDIuNjYyLDkuMDUxLDUuNCIvPgogIDxwYXRoIGQ9Ik0xNDMuODY4LDcxLjA0Yy43OTksMS40ODMsMS42MzUsNS40NzYuMjI4LDYuMDg1LTEuNzg3Ljc2MS00LjA2OS0xLjc0OS01LjAyLTIuODktMi4zOTYtMi44NTItNC4wMzEtNi45MjEtNS41OS0xMC40OTYtLjgzNy0xLjk3OC0xLjkwMi00LjE4My0xLjkwMi02LjA4NXMxLjY3My01LjI0OCwyLjg5LTUuNTE0Yy4zOC0uMDc2LDEuMjU1LDAsMS40NDUsMS41NTkuMjI4LDEuNTk3LS40NTYsMS45NC0uMzQyLDMuNTM3LjIyOCwzLjIzMywxLjE3OSw1LjU1MiwzLjExOCw3Ljk0OCwxLjcxMSwyLjA5MiwzLjk1NSwzLjY1MSw1LjEzNCw1Ljg1NyIvPgogIDxwYXRoIGQ9Ik0xNDEuNTQ4LDMzLjEyNGMuMzA0LDIuMzU4LS4zOCw1Ljg5NS0xLjMzMSw4LjA2Mi0yLjAxNiw0LjYwMi02LjE5OSw5LjA1MS0xMS40ODUsOS41MDgtMi44OS4yMjgtNS42MjguMjY2LTcuNDkyLS45ODkuNDU2LTEuNjczLDIuMzU4LTIuMDU0LDMuODAzLTIuNzc2LDIuNTQ4LTEuMjkzLDYuMjc1LTMuMzA5LDYuNjkzLTYuNjE3LjMwNC0yLjU0OC0uNzIzLTYuNTc5LTMuNjg5LTYuMzEzLTEuMzY5LjExNC0yLjA1NCwxLjc0OS0zLjQ2MSwxLjY3My0xLjgyNS0uMTUyLTIuNjI0LTMuMzg1LTIuMzU4LTUuMjEuMzQyLTIuMjQ0LDIuNDM0LTQuMjIxLDQuMjIxLTUuMzI0LDEuNjM1LS45ODksMy41NzUtMS4xNzksNS43MDUtMi4wOTIsMi4yNDQtLjk1MSwzLjQyMy0yLjQzNCw1LjI0OC0zLjQyMy4wNzYsMCwuMTE0LjExNC4yMjguMTE0LDEuNDA3LDEuMzY5LjYwOCwzLjYxMywxLjEwMyw1LjUxNC4yNjYuOTUxLDEuMjU1LDEuNjczLDEuNTU5LDIuNDM0LjMwNC43NjEuMzgsMS44MjUuNTcsMi43NzYuMTkuOTUxLjU3LDEuOTAyLjY4NSwyLjY2MiIvPgogIDxwYXRoIGQ9Ik0xMzguMjAxLDEwMC4wOTVjMS41OTcuOTg5LDMuODQxLDMuMTE4LjY4NSwzLjUzNy0yLjEzLjI2Ni00LjQ1LS40NTYtNi4yMzctLjk4OS0xLjc4Ny0uNTctMy40OTktMS44NjMtNS41OS0xLjY3My0zLjE1Ny4zNDItMy4zMDksMy4zODUtNS43MDUsNC43NTQtMi4yODItMS4yNTUtNC42NzgtNC41MjYtOC4yNTMtMy41MzctMS42NzMuNDU2LTIuMDkyLDIuNTEtMy44MDMsMi43NzYuNDU2LTEuNzExLDEuMDI3LTIuOTI4LDIuMjQ0LTQuMDY5LDEuMjkzLTEuMjU1LDMuNjEzLTEuODYzLDMuMzQ3LTQuMTgzLS4xMTQtMS4xMDMtMS42MzUtMS41NTktMS45MDItMi44OS0uMTktLjk4OS4xNTItMS44NjMuNjg1LTIuODksMS41NTkuMjI4LDMuMDA0LDEuMjkzLDQuMjIxLDIuMjA2LDEuMzY5Ljk4OSwyLjYyNCwyLjYyNCw0LjQ1LDIuODksMS41MjEuMjI4LDMuNDYxLS4xMTQsNS4zNjIsMCwzLjk5My4yNjYsNy40OTIsMi4yMDYsMTAuNDk2LDQuMDY5Ii8+CiAgPHBhdGggZD0iTTEzNS43MjksNzQuODgxYy40MTguNzk5LDEuMDY1LDEuOTc4Ljk4OSwyLjk2Ni0uMTksMy40NjEtMy45MTcsMi4zNTgtNS43MDUuNzYxLTMuNDk5LTMuMTE4LTUuNjI4LTguNTU3LTYuNDY1LTE1LjAyMi0uMzA0LTIuNDcyLTEuNTU5LTQuMzczLTEuNTU5LTYuNzMxLDAtLjUzMi4xOS0xLjc0OS40NTYtMS44NjMsMS4yOTMtLjQxOCwyLjEzLDEuNDA3LDIuODksMi4yMDYuOTEzLS42MDgsMS41OTctMS44MjUsMi43NzYtMS41NTksMS42MzUuMzguOTUxLDQuMjk3Ljk4OSw1Ljg1Ny4wNzYsMi4zMi4zMDQsNC42NC45MTMsNS45NzEsMS4xMDMsMi40MzQsMy4zMDksNC44Myw0LjY3OCw3LjQxNiIvPgogIDxwYXRoIGQ9Ik0xMjMuMjU1LDE4LjI5MmMuMjI4LjE5Ljk4OS41Ny42ODUuOTg5LTQuMDMxLTEuNDA3LTkuNjIyLTEuMjkzLTE0LjI2MS0yLjA5Mi0uMDM4LTEuMDI3LDEuNTIxLTEuMjU1Ljk4OS0yLjA5Mi0uNjg1LTEuMTQxLTEuMjU1LjY0Ny0yLjEzLjY0Ny0uOTg5LDAtLjgzNy0uOTUxLTEuNTU5LTEuNDQ1LS42ODUsMS4xNzktMS4wMjcsMi45NjYtMi4zNTgsMy4xMTgtLjk4OS4xMTQtMS44NjMtLjk1MS0yLjc3Ni0xLjMzMS0yLjMyLS45MTMtNS40MzgtLjcyMy03LjY4Mi0xLjMzMS0uNjA4LTEuNDA3LjkxMy0yLjA1NC40NTYtMy4wOC0uNzk5LTEuNzQ5LTUuODk1LjA3Ni02LjkyMS41Ny0yLjE2OCwxLjAyNy00Ljg2OCwyLjctNC41NjQsNS4wOTYuMjY2LDEuOTQsMy40OTksMy42ODksNS45MzMsNC43NTQsNS40LDIuMzk2LDEwLjI2OCwzLjM0NywxNC4yNjEsNi45NTksMS45NCwxLjc0OSwzLjI3MSwzLjg3OSw0LjY3OCw1Ljg1NywxLjQwNywxLjk0LDQuNzU0LDIuODksNi44MDcsNC45ODIuNDk0LjQ5NCwxLjM2OSwxLjQ4MywxLjIxNywyLjA5Mi0uMTUyLjY4NS0yLjEzLDEuNDQ1LTIuODksMS44NjNzLTIuNTQ4LDEuNTk3LTMuMTE4LDEuNTU5Yy0uODM3LDAtLjg3NS0uOTEzLTEuNDQ1LS45ODktMi4yNDQsMS45NzgtNy40MTYsMi4xMy0xMC45MTUsMS4yMTctMS40MDctLjM4LTMuMzg1LTEuNDgzLTQuOTA2LS4yMjgsMS4yMTcsMy4wOCw0LjI5NywzLjc2NSw3LjE1LDMuOTkzLjYwOC4wMzgsMS43MTEuMDM4LDIuNDcyLDAsMy42NTEtLjI2Niw2LjA0Ny0yLjU0OCw5LjgxMi0yLjk2Niw1LjI4Ni0uNTcsNy4yNjQsMi4xNjgsNy41NjgsNi41MDMuMTksMi41MS4wMzgsNS4xNzItLjU3LDcuNDE2LS43MjMsMi42NjItMy4yNzEsMy42ODktMy4zNDcsNi42MTctLjA3NiwzLjIzMywyLjEzLDUuNDM4LDQuMDMxLDYuOTU5LDEuMTQxLjkxMywyLjUxLDEuMzY5LDIuNjYyLDIuOTY2LjE5LDEuNzg3LS44MzcsNC4wNjktMS42NzMsNS42MjgtLjgzNywxLjU1OS0yLjA5MiwzLjQ5OS0yLjg5LDQuMjk3LS44MzcuODc1LTMuMzg1LDIuODE0LTQuNzkyLDIuMzItLjcyMy0uMjY2LS41MzItMS40ODMtMS4xMDMtMS43ODctLjc5OS0uMzgtMS40NDUuNjQ3LTIuNDcyLjY0Ny0yLjc3Ni4wMzgtMi45NjYtMi45NjYtMi44OS02LjE5OS0uOTEzLS42MDgtMS41OTctLjUzMi0yLjMyLS4yMjgtLjY4NS4zMDQtLjk1MSwxLjA2NS0xLjQ0NSwxLjMzMS0uODc1LjQ5NC0zLjgwMy4yMjgtNC42NzguODc1LS43OTkuNjA4LS43OTksMi44OS0xLjEwMyw0LjA2OS0uMzQyLDEuMzY5LTEuMDI3LDIuOTI4LTIuMjQ0LDMuMDA0cy0xLjY3My0xLjI5My0yLjU4Ni0xLjY3M2MtMi40NzItLjA3Ni00LjE4My40MTgtNS44MTktLjM0Mi0xLjU5Ny0uNzYxLTIuNTEtMy4yNzEtMy4xMTgtNS4wOTYtLjY0Ny0xLjkwMi0xLjUyMS00LjQ4OC0xLjY3My02LjM4OS0uMTktMi4zOTYsMS4yOTMtMy44MDMsMi42NjItNS4yMSwxLjA2NS0xLjA2NSwyLjczOC0yLjIwNiwyLjY2Mi0zLjc2NS0uMDc2LTEuNTIxLTIuMzU4LTMuMjMzLTMuMjMzLTQuNjQtMS4xNzktMS45MDItMi42MjQtNS40LTEuOTAyLTguODYxLjcyMy0zLjQ5OSwyLjgxNC02LjU0MSw0LjY3OC04LjkzNywyLjA5Mi0yLjcsNS4yNDgtNC43OTIsNS44OTUtNy42NDQuMjY2LTEuMjE3LjIyOC0yLjctLjIyOC0zLjg3OS0xLjE0MS0yLjg5LTUuMTcyLTQuOTA2LTguMTM4LTYuOTU5LTMuNTc1LTIuNDcyLTguMjE0LTUuMDk2LTcuNTY4LTExLjE0My4xNTItMS40ODMuNzIzLTMuMDA0LDEuMzMxLTMuOTkzLDIuODE0LTQuNTY0LDEwLjExNi00LjMzNSwxNi43MzMtMy45OTMuNDE4LTEuNzg3LS45ODktNC4wNjkuNzYxLTQuODY4LDEuNjczLDIuMzIsNC4xNDUsMy42ODksNy4xNSw1LjE3MiwyLjg1MiwxLjQ0NSw1LjI0OCwyLjg5LDkuMjc5LDIuNTQ4LjI2Ni43NjEuMzA0LDIuMjA2LjExNCwzLjA4LDMuODAzLjk4OSw4LjU1NywxLjY3MywxMS4zNzEsMy44NzkiLz4KICA8cGF0aCBkPSJNOTUuNjg0LDEwNS4wNzdjLS45MTMtLjExNC0xLjQ0NS0uOTg5LTIuNjYyLTEuMjE3LTEuNzg3LS4zNDItNC4yNTktLjA3Ni02LjIzNy4zNDItMS45NC40MTgtNC4xMDcsMS4wNjUtNC4xNDUsMi41NDhoLS4zNDJjLTIuMzItLjcyMy0zLjExOC0zLjc2NS01LjcwNS0zLjk5My0yLjEzLS4xNTItNC4xNDUsMS4xMDMtNi4yMzcsMS43NDktMi4xMy42ODUtNC4yOTcsMS4zMzEtNi44MDcuODc1Ljc2MS0yLjA1NCwyLjI0NC0zLjYxMywzLjkxNy00Ljc1NCwyLjIwNi0xLjUyMSw1LjIxLTIuNjYyLDguMzY3LTIuNjYyLjg3NSwwLDEuNTU5LjI2NiwyLjQ3Mi4yMjgsMy4wMDQtLjExNCw0LjYwMi0xLjk0LDYuMTIzLTMuNzY1LjY0Ny0uNzYxLDIuMTY4LTIuODksMy4yMzMtMi43NzYuODM3LjExNCwxLjQ4MywxLjc4NywxLjc4NywyLjY2Mi40NTYsMS4yOTMuNjQ3LDIuNzc2LjU3LDMuOTkzLDIuMDE2LDIuMTMsNC44NjgsMy40MjMsNS43MDUsNi43MzEiLz4KICA8cGF0aCBkPSJNODEuMDgsNDkuODE5YzAsLjk1MS0zLjMwOSwzLjk5My00LjMzNSw0LjE4My0xLjk3OC40MTgtMy45MTctLjgzNy01LjcwNS0xLjQ0NS0xLjkwMi0uNjQ3LTQuMTgzLTEuMDI3LTUuNDc2LTEuNjczLTIuMTY4LTEuMDY1LTQuMTgzLTMuNzI3LTUuNzA1LTUuNTE0LS43OTktLjk1MS0xLjUyMS0xLjk3OC0yLjQ3Mi0zLjA4LS45NTEtMS4xNDEtMi4yMDYtMi4zMi0yLjM1OC0zLjE5NS0uMTE0LS43OTkuNDk0LTEuOTc4LjQ1Ni0yLjg5LS4wNzYtLjk4OS0uNzYxLTEuNzg3LS45ODktMi42NjItLjQ5NC0xLjcxMS0uNDk0LTQuNTI2LjExNC01Ljk3MS4zOC0uODM3LDEuMTQxLTEuNzExLDEuOTAyLTIuNDM0Ljc2MS0uNjg1LDEuNzQ5LTEuMjE3LDIuMTMtMi4yMDYuMjY2LS43NjEsMC0yLjc3NiwxLjIxNy0zLjE5NSwxLjQ4My0uNDk0LDQuMjIxLDIuMDE2LDUuNTksMi44OSwzLjUzNywyLjI0NCw2LjkyMSwzLjg0MSw5LjEyNyw3LjUzLDEuMTAzLDEuODI1LDMuMDgsNi4wODUuNTcsNy4zMDItMS4zMzEuNjQ3LTIuODE0LjA3Ni0zLjgwMy0uNDU2LTEuMDI3LS41Ny0xLjY3My0xLjkwMi0yLjg5LTEuOTc4LTIuMjQ0LS4xNTItMy4zMDksMy41MzctMy4zNDcsNS4wOTYtLjAzOCwyLjc3NiwxLjk3OCw2LjYxNywzLjkxNyw3LjcyLDEuNTU5LjkxMyw0LjY0LDEuNTIxLDYuNTc5LDEuMTAzLDEuMTQxLS4yMjgsMS40ODMtMS4xMDMsMi43NzYtMS4xMDMsMS41MjEsMCwyLjY2MiwxLjIxNywyLjY2MiwxLjk3OCIvPgogIDxwYXRoIGQ9Ik03Ny42MTksNTUuNzljMi45NjYtLjY4NSwxLjUyMSw3LjE4OCwxLjMzMSw5LjUwOC0uNTMyLDYuMjc1LS45MTMsMTAuODAxLTMuODAzLDE0Ljc5NC0uOTUxLDEuMzMxLTIuNTEsMy4yMzMtNC40NSwzLjE5NS0xLjE0MSwwLTIuNjYyLS45MTMtMy4wMDQtMi4wOTItLjY0Ny0yLjEzLjU3LTQuNDUsMS41NTktNi4zMTMuNzIzLTEuMzY5LDEuOTAyLTMuMjcxLDIuNjYyLTUuNC44MzctMi4zMiwxLjM2OS00LjM3MywxLjc4Ny02LjMxMy42NDctMi45NjYsMS4zMzEtNS44OTUsMy42ODktNy4zMDIuMDc2LS4wMzguMDc2LS4wNzYuMjI4LS4xMTQiLz4KICA8cGF0aCBkPSJNNzEuODAxLDU0LjU3M2MxLjI1NSwyLjU0OC0uNDk0LDUuMjEtMS40NDUsNy40MTYtMi4wNTQsNC43NTQtMy45OTMsOC43NDctNy4zNzgsMTIuNTg4LTEuMTc5LDEuMzMxLTMuNDk5LDQuMTQ1LTUuODk1LDMuOTkzLTEuMDY1LS4wNzYtMi4yMDYtMS4xNzktMi4zNTgtMS45NzgtLjM0Mi0yLjI0NCwyLjYyNC00LjMzNSwzLjY4OS01LjQsMS42MzUtMS41OTcsMy43MjctMy4wNDIsNC42NzgtNC42NCwxLjU5Ny0yLjYyNCwyLjczOC00Ljc5MiwzLjkxNy03LjQxNi45NTEtMi4wOTIsMS4yMTctNS4wOTYsNC43OTItNC41MjYiLz4KICA8cGF0aCBkPSJNNjAuMDExLjgzN2M0LjQxMS0uNDE4LDkuMjc5LDEuMzMxLDguNzA5LDUuNjI4LS4xOSwxLjQ4My0xLjIxNywyLjQzNC0yLjI0NCwzLjQyMy0uOTEzLjg3NS0xLjkwMiwxLjk0LTMuMzQ3LDEuOTc4LjA3Ni0xLjEwMywxLjk0LTMuOTU1LjY4NS01LjYyOC0xLjIxNy0xLjU5Ny02LjEyMy0uMzA0LTcuMTUuMzQyLTIuNDcyLDEuNTIxLTMuODQxLDUuMjg2LTIuMjQ0LDguNjMzLjU3LDEuMTc5LDMuNDIzLDMuNDIzLDIuNTQ4LDUuNC0uNTMyLDEuMTc5LTIuMjQ0Ljk4OS0zLjIzMy40NTYtMi4xMy0xLjE0MS0zLjk5My00LjI1OS00LjU2NC02LjYxNy0uNzIzLTIuOTY2LjI2Ni02LjkyMSwxLjkwMi04LjkzNywxLjU5Ny0yLjAxNiw1LjYyOC00LjMzNSw4LjkzNy00LjY0Ii8+CiAgPHBhdGggZD0iTTYyLjU1OSw1My4zNTZjMS44MjUtLjM0MiwzLjA4LDIuNzM4LDIuMTMsNC45ODItLjc2MSwxLjc4Ny0zLjA4LDMuNjEzLTUuMDIsNS41MTQtMi4yMDYsMi4xNjgtMy45NTUsMy43NjUtNS44OTUsNC42NC0xLjkwMi44MzctNy4wMzYuNzk5LTcuMjY0LTEuNDQ1LS4xNTItMS43ODcsMy41NzUtNC4wNjksNS4xMzQtNS4yMSwxLjgyNS0xLjI5Myw0LjY3OC0yLjc3Niw2LjIzNy0zLjk5MywxLjYzNS0xLjI1NSwyLjczOC0zLjU3NSw0LjQ1LTQuNDExLjA3NiwwLC4wNzYtLjA3Ni4yMjgtLjExNCIvPgogIDxwYXRoIGQ9Ik02MC44ODYsNTAuNThjLjQ1NiwxLjI5My0xLjQwNywyLjczOC0yLjI0NCwzLjQyMy0xLjIxNywxLjA2NS0yLjI4MiwxLjg2My0zLjM0NywyLjU0OC0yLjczOCwxLjc4Ny00Ljc5MiwzLjM0Ny04LjM2NywzLjMwOS0xLjkwMiwwLTQuNjQtLjk1MS00Ljc5Mi0yLjQzNC0uMTUyLTEuMTQxLDEuNDgzLTMuMzA5LDIuODktMy43NjUsMS45NC0uNjA4LDQuMTQ1LS42ODUsNi4xMjMtMS40NDUsMi4zOTYtLjkxMywzLjk5My0yLjEzLDYuNjkzLTIuNDM0Ljk1MS0uMTE0LDIuNjYyLS4yMjgsMy4wMDQuNzYxIi8+CiAgPHBhdGggZD0iTTU2LjMyMyw0NS43MTJjLjY4NSwzLjAwNC00LjQ4OCwzLjU3NS02LjM1MSw0LjE4My0zLjg3OSwxLjI5My04LjgyMywyLjA5Mi0xMC42MS0xLjEwM3YtMS4yMTdjMS42NzMtMy41MzcsNi45NTktMi44OSwxMS45NDEtMy4wOCwxLjc4Ny0uMDc2LDQuNjc4LS4yMjgsNS4wMiwxLjIxNyIvPgogIDxwYXRoIGQ9Ik00OS41MTUsMzcuMzA3YzEuMjU1LjIyOCwzLjQ2MSwxLjk3OCwzLjQ2MSwzLjA4LDAsLjc5OS0uOTEzLDEuNTIxLTEuNzg3LDEuNjM1LTEuNTk3LjIyOC0yLjUxLS42ODUtMy41NzUtLjk4OS0xLjE3OS0uMzQyLTIuNTQ4LS4yMjgtMy42ODktLjc2MS0uOTEzLS40NTYtMS43NDktMS4yNTUtMi4zNTgtMS44NjMtLjYwOC0uNjQ3LTEuNTIxLTEuNjM1LTEuMTAzLTIuNzc2LDIuMzk2LS44MzcsMy45OTMsMS4zNjksNi45MjEsMS42MzUuNjg1LjA3NiwxLjQ0NS0uMTE0LDIuMTMsMCIvPgogIDxwYXRoIGQ9Ik01Mi4wNjMsMjIuMTcyYy40NTYsMS4wMjcsMS4xNDEsNC42NC0uMTE0LDQuOTgyLS44MzcuMjI4LTEuNzQ5LTEuMTAzLTIuNDcyLTEuNjczLS44NzUtLjY4NS0xLjcxMS0xLjI1NS0yLjM1OC0xLjYzNS0yLjczOC0xLjcxMS02LjE5OS0yLjYyNC01LjU5LTcuNzIuMTktMS42NzMsMS40ODMtNC4yOTcsMi4zNTgtNC43NTQuMDc2LDAsLjExNC4wMzguMTE0LjExNCwxLjEwMywxLjEwMywxLjY3MywyLjU0OCwyLjU0OCwzLjc2NS44NzUsMS4xNzksMS43ODcsMi4yNDQsMi43NzYsMy40MjMuNzk5LjkxMywyLjA1NCwyLjA1NCwyLjY2MiwzLjUzNyIvPgogIDxwYXRoIGQ9Ik01MS41MzEsMzIuMTM1Yy42MDgsNC4yMjEtMi44MTQsMy4xOTUtNS4xMzQsMi4wOTItMy45NTUtMS44NjMtNi41NzktNC4zNzMtNy4wMzYtOS4xNjV2LS44NzVjLjIyOC0uODM3LjExNC0yLjUxLDEuMTAzLTIuNjYyLjc5OS0uMTE0LDIuNjYyLDEuNzg3LDMuMzQ3LDIuMzIsMS4xNDEuODM3LDIuMTY4LDEuNDgzLDMuMjMzLDIuNTQ4Ljk1MS45NTEsMS40MDcsMS43NDksMi4zNTgsMi43NzYuNzk5LjgzNywxLjk3OCwxLjk0LDIuMTMsMi45NjYiLz4KICA8cGF0aCBkPSJNMjEuMTQ1LDE0MS40MzRjLS40OTQsMS42NzMtMS4zNjksNC4yOTctMS45NCw1LjU1Mi0uOTUxLjE5LTQuMDMxLjg3NS02LjUwMy44NzUtOC45MzcsMC0xMi43MDItNi4wODUtMTIuNzAyLTExLjc1MSwwLTcuNDU0LDUuNTUyLTEyLjQzNiwxMy42MTUtMTIuNDM2LDIuNzM4LDAsNS4xNzIuNjg1LDYuMTYxLjkxMy4zMDQsMS45NzguNTMyLDMuNDk5LjcyMyw1LjY2NmwtMS4zMzEuMjY2Yy0xLjEwMy0zLjk5My0zLjI3MS01LjI4Ni02LjQyNy01LjI4Ni01LjE3MiwwLTguMSw0Ljc1NC04LjEsMTAuMTE2LDAsNi41MDMsMy41NzUsMTAuODc3LDguMzY3LDEwLjg3NywzLjA4LDAsNC45ODItMS43ODcsNi43NjktNS4zNjJsMS4zNjkuNTMydi4wMzhaIi8+CiAgPHBhdGggZD0iTTI2LjM1NSwxNDcuODIzYy0xLjMzMSwwLTIuMzU4LTEuMDY1LTIuMzU4LTIuNDcyczEuMDI3LTIuNTEsMi4zOTYtMi41MSwyLjM5NiwxLjA2NSwyLjM5NiwyLjUxLS45ODksMi40NzItMi4zOTYsMi40NzJoLS4wMzhaIi8+CiAgPHBhdGggZD0iTTUwLjkyMiwxNDcuMzY2di0xLjMzMWMyLjc3Ni0uMzA0LDIuODktLjQ1NiwyLjg1Mi0zLjg0MWwtLjA3Ni0xNC4wNzFoLS4xMTRsLTcuOTQ4LDE4Ljk3N2gtMS4wNjVsLTcuMjY0LTE4LjU1OWgtLjE1MmwtLjQxOCw5LjY5OGMtLjE1MiwyLjk2Ni0uMTUyLDQuNTI2LS4wNzYsNS42NjYuMTE0LDEuNTk3Ljg3NSwxLjkwMiwzLjIzMywyLjA5MnYxLjM2OWgtOC41MTl2LTEuMzY5YzEuOTc4LS4xOSwyLjYyNC0uNjA4LDIuODUyLTIuMDE2LjIyOC0xLjE3OS40MTgtMi44NTIuNjg1LTYuNDI3bC41MzItNy40MTZjLjMwNC00LjEwNy4wNzYtNC4zNzMtMy4wMDQtNC42NHYtMS4zMzFoNi44NDVsNy4wNzQsMTYuMzE1LDcuMjY0LTE2LjMxNWg2LjgwN3YxLjMzMWMtMi45MjguMjY2LTMuMDQyLjM4LTIuOTY2LDMuNTM3bC4zMDQsMTMuMTJjLjA3NiwzLjM4NS4xOSwzLjUzNywzLjA0MiwzLjg0MXYxLjMzMWgtOS45MjZsLjAzOC4wMzhaIi8+CiAgPHBhdGggZD0iTTY2LjQ3NywxNDcuODIzYy0xLjMzMSwwLTIuMzU4LTEuMDY1LTIuMzU4LTIuNDcyczEuMDI3LTIuNTEsMi4zOTYtMi41MSwyLjM5NiwxLjA2NSwyLjM5NiwyLjUxLS45ODksMi40NzItMi4zOTYsMi40NzJoLS4wMzhaIi8+CiAgPHBhdGggZD0iTTg5LjM3MSwxMjQuMjQ0YzIuNywwLDQuNjQuMzgsNi4xMjMsMS40NDUsMS41MjEsMS4wMjcsMi40NzIsMi44MTQsMi40NzIsNS4xMzQsMCw0LjcxNi0zLjQ2MSw2Ljk2LTcuMTEyLDcuMzc4LS41MzIuMDc2LTEuMTAzLjA3Ni0xLjUyMS4wNzZsLTIuNDcyLS42NDd2NS4wOTZjMCwyLjk2Ni4zMDQsMy4xNTcsMy40NjEsMy4zODV2MS4yOTNoLTEwLjM4MnYtMS4yOTNjMi43LS4yMjgsMy4wNDItLjQ5NCwzLjA0Mi0zLjM4NXYtMTMuNjkxYzAtMy4wNDItLjM0Mi0zLjIzMy0yLjgxNC0zLjQyM3YtMS4zMzFoOS4yMDN2LS4wMzhaTTg2Ljg2MSwxMzYuMTg2Yy40NTYuMTksMS4zMzEuMzgsMi4yNDQuMzgsMS43MTEsMCw0LjQ4OC0xLjEwMyw0LjQ4OC01LjU5LDAtMy45MTctMi4zOTYtNS4yODYtNC43OTItNS4yODYtLjc2MSwwLTEuMzY5LjExNC0xLjU1OS4zNDItLjI2Ni4yMjgtLjM4LjYwOC0uMzgsMS4zNjl2OC44MjMtLjAzOFoiLz4KICA8cGF0aCBkPSJNMTA5Ljc1NSwxNDcuMzY2di0xLjE3OWMxLjgyNS0uMjI4LDIuMDE2LS40NTYsMi4wMTYtMi41NDh2LTYuMDQ3YzAtMi44MTQtMS4xMDMtMy45NTUtMi44OS0zLjk1NS0xLjA2NSwwLTIuMjQ0LjQxOC0zLjA4LDEuMzY5djguNjMzYzAsMi4wOTIuMTksMi4zMiwxLjk0LDIuNTQ4djEuMTc5aC04LjAyNHYtMS4xNzljMi4wNTQtLjIyOCwyLjMyLS4zOCwyLjMyLTIuNTg2di0xNi40MjljMC0yLjE2OC0uMTUyLTIuMjA2LTIuMTY4LTIuMzk2di0xLjE3OWMxLjgyNS0uMjY2LDQuMTA3LS43MjMsNS45MzMtMS4yMTd2MTEuMTgxYzEuMjE3LTEuMjE3LDMuMDQyLTIuMzk2LDQuOTA2LTIuMzk2LDMuMDA0LDAsNC44NjgsMi4wMTYsNC44NjgsNS45NzF2Ni41MDNjMCwyLjIwNi4yNjYsMi4zMiwyLjIwNiwyLjU4NnYxLjE3OWgtNy45ODZsLS4wMzgtLjAzOFoiLz4KICA8cGF0aCBkPSJNMTI3LjgxOSwxMzEuMTI4YzQuNjQsMCw3LjgzNCwzLjY1MSw3LjgzNCw4LjA2MiwwLDUuNzgxLTQuMTA3LDguNjMzLTcuOTEsOC42MzMtNS4yNDgsMC04LjEtNC4wMzEtOC4xLTcuOTQ4LDAtNS45NzEsNC41MjYtOC43NDcsOC4xMzgtOC43NDdoLjAzOFpNMTI3LjMyNSwxMzIuNTczYy0xLjcxMSwwLTMuMzQ3LDIuMDU0LTMuMzQ3LDYuMDQ3LDAsNC40MTEsMS42MzUsNy43NTgsNC4xNDUsNy43NTgsMS43MTEsMCwzLjIzMy0xLjI5MywzLjIzMy02LjI3NSwwLTQuNTI2LTEuNDA3LTcuNTY4LTMuOTkzLTcuNTY4bC0uMDM4LjAzOFoiLz4KICA8cGF0aCBkPSJNMTUxLjY2NCwxNDQuMTcyYy0yLjE2OCwyLjkyOC00Ljc1NCwzLjY1MS02LjE2MSwzLjY1MS00LjU2NCwwLTcuMTg4LTMuNTM3LTcuMTg4LTcuNjgyLDAtMi43LDEuMTQxLTQuOTgyLDIuNTQ4LTYuNDY1LDEuNTIxLTEuNTU5LDMuNDIzLTIuNTQ4LDUuMjg2LTIuNTQ4aC4wMzhjMy4xNTcsMCw1LjYyOCwyLjc3Niw1LjU5LDUuNzA1LDAsLjc2MS0uMTUyLDEuMjE3LS45MTMsMS4zMzEtLjYwOC4xMTQtNS4wMi40NTYtOC44MjMuNjA4LjA3Niw0LjEwNywyLjQzNCw2LjA4NSw0Ljk0NCw2LjA4NSwxLjQ0NSwwLDIuNzM4LS40OTQsMy45OTMtMS42MzVsLjY0Ny45NTFoLjAzOFpNMTQyLjIzMiwxMzcuMDIyYzEuNzExLDAsMy4yNzEsMCw1LjAyLS4xMTQuNTcsMCwuNzYxLS4xNTIuNzYxLS43MjMsMC0xLjgyNS0uOTg5LTMuNTM3LTIuNTQ4LTMuNTM3cy0yLjg1MiwxLjY3My0zLjIzMyw0LjQxMXYtLjAzOFoiLz4KICA8cGF0aCBkPSJNMTYzLjg3MSwxNDcuMzY2di0xLjE3OWMxLjc0OS0uMjY2LDEuOTQtLjQxOCwxLjk0LTIuNzM4di02LjA4NWMwLTIuNTEtLjk4OS0zLjY1MS0yLjczOC0zLjY1MS0xLjEwMywwLTIuMTY4LjU3LTMuMTU3LDEuNDQ1djguNDQzYzAsMi4yMDYuMTUyLDIuMzU4LDEuOTQsMi41ODZ2MS4xNzloLTguMTM4di0xLjE3OWMyLjI0NC0uMzA0LDIuNDM0LS40MTgsMi40MzQtMi42NjJ2LTcuMzc4YzAtMi4xNjgtLjE5LTIuMjgyLTIuMDE2LTIuNTg2di0xLjE0MWMxLjk3OC0uMjY2LDMuOTkzLS43MjMsNS43ODEtMS4zNjl2Mi43Yy42NDctLjQ5NCwxLjQwNy0xLjAyNywyLjI0NC0xLjU5Ny45ODktLjY0NywxLjgyNS0xLjAyNywyLjg1Mi0xLjAyNywyLjg5LDAsNC42MDIsMi4wOTIsNC42MDIsNS41NTJ2Ni45MjFjMCwyLjIwNi4yMjgsMi4zMiwyLjE2OCwyLjU4NnYxLjE3OWgtNy45MVoiLz4KICA8cGF0aCBkPSJNMTczLjU2OSwxNDcuMzY2di0xLjE3OWMyLjA5Mi0uMjY2LDIuMzU4LS40MTgsMi4zNTgtMi44NTJ2LTcuMTEyYzAtMi4yODItLjE5LTIuMzU4LTIuMDkyLTIuNjYydi0xLjE0MWMyLjA1NC0uMjY2LDQuMTQ1LS43MjMsNS44OTUtMS4zMzF2MTIuMjQ2YzAsMi4zOTYuMTksMi41ODYsMi4zOTYsMi44NTJ2MS4xNzlzLTguNTU3LDAtOC41NTcsMFpNMTc1LjI4LDEyNi40NWMwLTEuMzMxLDEuMDY1LTIuMzIsMi4yODItMi4zMnMyLjI0NC45ODksMi4yNDQsMi4zMmMwLDEuMTc5LS45NTEsMi4yNDQtMi4yODIsMi4yNDQtMS4xNzksMC0yLjI0NC0xLjA2NS0yLjI0NC0yLjI0NFoiLz4KICA8cGF0aCBkPSJNMTkxLjU1NywxNDcuMzY2di0xLjE3OWMxLjQwNy0uMjI4LDEuNjM1LS40OTQuOTg5LTEuNTU5bC0yLjA1NC0zLjQyM2MtLjY4NSwxLjA2NS0xLjQwNywyLjI0NC0xLjk0LDMuMjMzLS42MDgsMS4xMDMtLjQ5NCwxLjQwNy45ODksMS43MTF2MS4xNzloLTYuNjkzdi0xLjE3OWMyLjAxNi0uMzQyLDIuNjYyLS42ODUsMy45MTctMi4yNDQuODc1LTEuMTAzLDEuODI1LTIuMzk2LDIuODktMy45OTNsLTMuMDA0LTQuOTgyYy0uOTg5LTEuNjczLTEuNDgzLTEuOTc4LTMuMzQ3LTIuMjA2di0xLjI1NWg3Ljc1OHYxLjI1NWMtMS4yMTcuMTktMS40MDcuNDk0LS44MzcsMS40NDVsMS43NDksMi44NTJjLjcyMy0xLjAyNywxLjMzMS0yLjA1NCwxLjg2My0yLjkyOC40OTQtLjk1MS4zMDQtMS4xNzktLjk4OS0xLjM2OXYtMS4yNTVoNi41MDN2MS4yNTVjLTIuMDU0LjIyOC0yLjQ3Mi40MTgtMy42ODksMS43NDktLjc2MS44MzctMS41NTksMi4wNTQtMi43NzYsMy44MDNsMy4yNzEsNS4yMWMxLjIxNywyLjAxNiwyLjAxNiwyLjQzNCwzLjg0MSwyLjY2MnYxLjE3OWgtOC40MDVsLS4wMzguMDM4WiIvPgo8L3N2Zz4=";

const Logo = ({ height = 28, gold = false }) => (
  <img src={LOGO_URI} alt="Logo" style={{
    height, width: "auto",
    filter: gold
      ? "brightness(0) saturate(100%) invert(72%) sepia(15%) saturate(700%) hue-rotate(5deg) brightness(92%) contrast(87%)"
      : "brightness(0) invert(1) opacity(0.9)",
  }} />
);

// ─── Helpers ───
function fmtPrice(v, c) { if (!v) return ""; const n = parseInt(v); if (isNaN(n)) return v; return `${CURRENCIES[c]||"¥"}${n.toLocaleString()}`; }
function sqmToTsubo(s) { return s ? (parseFloat(s) * SQM_TO_TSUBO).toFixed(1) : ""; }
function fmtArea(s) { return s ? `${parseFloat(s).toLocaleString()} ㎡ (${sqmToTsubo(s)} tsubo)` : "—"; }
function getLangVal(obj, lang) { if (!obj) return ""; return obj[lang] || obj.en || obj.ja || obj.zh || ""; }

// ─── Shared Input Styles ───
const iS = { width:"100%",padding:"10px 14px",background:C.bgInput,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontFamily:F.body,fontWeight:300,fontSize:14,outline:"none",boxSizing:"border-box" };
const selS = { ...iS, appearance:"none", cursor:"pointer" };

function Field({ label, children, compact }) {
  return (<div style={{ marginBottom: compact ? 10 : 16 }}>
    <div style={{ fontSize:11,fontFamily:F.body,fontWeight:500,letterSpacing:1,color:C.gold,marginBottom:6,textTransform:"uppercase" }}>{label}</div>
    {children}
  </div>);
}

function TriField({ label, value, onChange, placeholder, textarea }) {
  const [tab, setTab] = useState("en");
  const El = textarea ? "textarea" : "input";
  return (<Field label={label}>
    <div style={{ display:"flex",gap:2,marginBottom:6 }}>
      {[["en","EN"],["ja","日本語"],["zh","中文"]].map(([k,l])=>(
        <button key={k} onClick={()=>setTab(k)} style={{ padding:"4px 12px",fontSize:10,fontFamily:F.body,fontWeight:tab===k?500:300,background:tab===k?C.gold:"transparent",color:tab===k?C.bg:C.textDim,border:`1px solid ${tab===k?C.gold:C.border}`,borderRadius:4,cursor:"pointer" }}>{l}{value?.[k]?" ●":""}</button>
      ))}
    </div>
    <El style={{ ...iS,...(textarea?{minHeight:80,resize:"vertical"}:{}) }} value={value?.[tab]||""} onChange={e=>onChange({...value,[tab]:e.target.value})} placeholder={placeholder} />
  </Field>);
}

function ImageUpload({ images, onChange, label, multiple=true }) {
  const ref = useRef(null);
  const handle = (files) => {
    const ps = Array.from(files).map(f=>new Promise(r=>{ const rd=new FileReader(); rd.onload=e=>r({name:f.name,data:e.target.result}); rd.readAsDataURL(f); }));
    Promise.all(ps).then(ni => onChange(multiple ? [...images,...ni] : ni.slice(0,1)));
  };
  return (<div>
    <div style={{ fontSize:11,fontFamily:F.body,fontWeight:500,letterSpacing:1,color:C.gold,marginBottom:8,textTransform:"uppercase" }}>{label}</div>
    <div onClick={()=>ref.current?.click()} onDragOver={e=>{e.preventDefault();}} onDrop={e=>{e.preventDefault();handle(e.dataTransfer.files);}}
      style={{ border:`1px dashed ${C.border}`,borderRadius:8,padding:20,textAlign:"center",cursor:"pointer",background:"rgba(196,164,112,0.03)",minHeight:80 }}>
      <input ref={ref} type="file" accept="image/*" multiple={multiple} style={{display:"none"}} onChange={e=>handle(e.target.files)} />
      {images.length===0 ? <div style={{color:C.textDim,fontSize:13,fontFamily:F.body,fontWeight:300}}><div style={{fontSize:24,marginBottom:6,opacity:0.4}}>+</div>Click or drag to upload</div>
      : <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
          {images.map((img,i)=>(<div key={i} style={{position:"relative"}}><img src={img.data} alt="" style={{width:80,height:60,objectFit:"cover",borderRadius:4}} />
            <button onClick={e=>{e.stopPropagation();onChange(images.filter((_,j)=>j!==i));}} style={{position:"absolute",top:-6,right:-6,width:18,height:18,borderRadius:9,background:C.danger,color:"#fff",border:"none",cursor:"pointer",fontSize:10,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button></div>))}
          <div style={{width:80,height:60,border:`1px dashed ${C.border}`,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",color:C.textDim,fontSize:20}}>+</div>
        </div>}
    </div>
  </div>);
}

// ─── AI Tools Component ───
function AITools({ property, onChange, t, lang }) {
  const [loadingCatch, setLoadingCatch] = useState(false);
  const [loadingSell, setLoadingSell] = useState(false);
  const [loadingComps, setLoadingComps] = useState(false);
  const [compLang, setCompLang] = useState(lang);
  const p = property;
  const isRental = p.type === "rental";

  const buildPropertySummary = () => {
    const parts = [];
    const nm = getLangVal(p.name, "en") || getLangVal(p.name, "ja");
    if (nm) parts.push(`Property: ${nm}`);
    const loc = getLangVal(p.location, "en") || getLangVal(p.location, "ja");
    if (loc) parts.push(`Location: ${loc}`);
    if (p.type) parts.push(`Type: ${p.type}`);
    if (p.bedrooms) parts.push(`Bedrooms: ${p.bedrooms}`);
    if (p.bathrooms) parts.push(`Bathrooms: ${p.bathrooms}`);
    if (p.landArea) parts.push(`Land: ${p.landArea} sqm`);
    if (p.buildingArea) parts.push(`Building: ${p.buildingArea} sqm`);
    if (p.structure) parts.push(`Structure: ${p.structure}`);
    if (p.features) parts.push(`Features: ${p.features}`);
    if (p.zoning) parts.push(`Zoning: ${p.zoning}`);
    if (!isRental && p.price) parts.push(`Listed price: ${CURRENCIES[p.currency]||"¥"}${parseInt(p.price).toLocaleString()}`);
    if (isRental && p.monthlyRent) parts.push(`Monthly rent: ¥${parseInt(p.monthlyRent).toLocaleString()}`);
    if (p.deposit) parts.push(`Deposit: ${p.deposit}`);
    if (p.keyMoney) parts.push(`Key money: ${p.keyMoney}`);
    if (p.managementFee) parts.push(`Management fee: ¥${p.managementFee}`);
    if (p.furnished) parts.push(`Furnished: ${p.furnished}`);
    if (p.petPolicy) parts.push(`Pets: ${p.petPolicy}`);
    if (p.parkingIncluded) parts.push(`Parking: ${p.parkingIncluded}`);
    if (p.nearestStation?.en || p.nearestStation?.ja) parts.push(`Station: ${getLangVal(p.nearestStation, "en")}`);
    if (p.nearestAttraction?.en || p.nearestAttraction?.ja) parts.push(`Attraction: ${getLangVal(p.nearestAttraction, "en")}`);
    if (p.developer) parts.push(`Developer: ${p.developer}`);
    if (p.currentStatus) parts.push(`Status: ${p.currentStatus}`);
    if (p.type === "building") {
      parts.push(`Building category: ${p.buildingCategory}`);
      if (p.totalFloors) parts.push(`Total floors: ${p.totalFloors}`);
      if (p.netLeasableArea) parts.push(`Net leasable area: ${p.netLeasableArea} sqm`);
      if (p.occupancyRate) parts.push(`Occupancy rate: ${p.occupancyRate}%`);
      if (p.annualIncome) parts.push(`Annual gross income: ¥${parseInt(p.annualIncome).toLocaleString()}`);
      if (p.noi) parts.push(`NOI: ¥${parseInt(p.noi).toLocaleString()}`);
      if (p.capRate) parts.push(`Cap rate: ${p.capRate}%`);
      if (p.floors?.length) parts.push(`Floor breakdown: ${p.floors.map(f => {const fa=(f.units||[]).reduce((s,u)=>s+(parseFloat(u.area)||0),0); return `${f.label}: ${fa}sqm, ${(f.units||[]).length} units (${f.usage})`;}).join("; ")}`);
    }
    return parts.join("\n");
  };

  const [aiError, setAiError] = useState("");

  const callClaude = async (prompt, tokens = 4096) => {
    setAiError("");
    try {
      const resp = await fetch("/api/claude", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: tokens,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        const msg = errData?.error?.message || `API error ${resp.status}`;
        setAiError(msg);
        return "";
      }
      const data = await resp.json();
      if (data.error) { setAiError(data.error.message || "Unknown API error"); return ""; }
      const text = data.content?.map(i => i.text || "").join("\n") || "";
      if (!text) setAiError("Empty response from AI");
      return text;
    } catch (e) { setAiError(`Network error: ${e.message}`); return ""; }
  };

  const [compFilters, setCompFilters] = useState({
    area: getLangVal(p.location, "ja") || getLangVal(p.location, "en") || "",
    radius: "3",
    sizeMin: "", sizeMax: "",
    priceMin: "", priceMax: "",
    yearMin: "", yearMax: "",
    types: ["residential", "office", "retail", "mixed", "land"],
    resultsCount: "6",
  });
  const cf = compFilters;
  const setCF = (k, v) => setCompFilters(prev => ({ ...prev, [k]: v }));
  const toggleType = (t2) => setCF("types", cf.types.includes(t2) ? cf.types.filter(x => x !== t2) : [...cf.types, t2]);
  const [showFilters, setShowFilters] = useState(true);

  const [compStatus, setCompStatus] = useState("");

  const searchComps = async () => {
    if (!cf.area) return;
    setLoadingComps(true);
    setAiError("");
    setCompStatus(lang==="ja"?"ウェブ検索中…":"Searching web for real listings…");
    
    const filterLines = [`Area: ${cf.area} (within ${cf.radius}km radius)`];
    if (cf.sizeMin || cf.sizeMax) filterLines.push(`Size: ${cf.sizeMin||"any"}-${cf.sizeMax||"any"} sqm`);
    if (cf.priceMin || cf.priceMax) filterLines.push(`Price: ¥${cf.priceMin||"any"}-¥${cf.priceMax||"any"}`);
    if (cf.yearMin || cf.yearMax) filterLines.push(`Year: ${cf.yearMin||"any"}-${cf.yearMax||"any"}`);
    filterLines.push(`Types: ${cf.types.join(", ")}`);
    const priceFld = isRental ? "rent" : "price";
    const n = parseInt(cf.resultsCount) || 6;

    const basePrompt = `Generate ${n} comparable ${isRental?"rental":"for-sale"} properties near ${cf.area} (${cf.radius}km radius), Japan.

Criteria:
${filterLines.join("\n")}

RESPOND WITH ONLY A JSON ARRAY. No explanation. Start with [ end with ].
Format: [{"n":"Name","nj":"名前","nz":"名稱","loc":"Location","locj":"所在地","locz":"位置","${priceFld}":"¥120,000,000","size":"150 sqm","type":"Residential","typej":"住居","note":"2018, RC, ¥800k/sqm","notej":"2018年築","notez":"2018年建","url":""}]
Include year built, structure, price/sqm in notes. Vary types: ${cf.types.join(", ")}.`;

    const webPrompt = `Search Japanese real estate sites (suumo.jp, homes.co.jp, athome.co.jp, rakumachi.jp) for ${isRental?"rental":"sale"} properties near ${cf.area} within ${cf.radius}km.

Criteria:
${filterLines.join("\n")}

Find real listings. After searching, return exactly ${n} results as a JSON array ONLY. No other text. Start with [ end with ].
Format: [{"n":"Name","nj":"名前","nz":"名稱","loc":"Location","locj":"所在地","locz":"位置","${priceFld}":"¥120,000,000","size":"150 sqm","type":"Residential","typej":"住居","note":"2018, RC, ¥800k/sqm","notej":"2018年築","notez":"2018年建","url":"https://suumo.jp/..."}]
Include source URLs. Vary types: ${cf.types.join(", ")}.`;

    // Helper: fetch with timeout
    const fetchWithTimeout = (body, timeoutMs) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      return fetch("/api/claude", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body), signal: controller.signal,
      }).finally(() => clearTimeout(timer));
    };

    // Helper: extract text from response
    const extractResult = (data) => {
      if (!data?.content) return "";
      return data.content.filter(b => b.type === "text").map(b => b.text).join("\n");
    };

    // Helper: parse comps JSON
    const parseComps = (text) => {
      const cleaned = text.replace(/```json|```/g, "").trim();
      const m = cleaned.match(/\[[\s\S]*\]/);
      if (!m) return null;
      return JSON.parse(m[0]);
    };

    // Stage 1: Try with web search (25s timeout)
    try {
      const resp = await fetchWithTimeout({
        model: "claude-sonnet-4-20250514", max_tokens: 4096,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: [{ role: "user", content: webPrompt }],
      }, 25000);
      
      if (resp.ok) {
        const data = await resp.json();
        const text = extractResult(data);
        if (text) {
          const comps = parseComps(text);
          if (comps && comps.length > 0) {
            onChange({ ...p, rentComps: comps });
            setCompStatus("");
            setLoadingComps(false);
            return;
          }
        }
      }
    } catch(e) { /* timeout or network error — fall through */ }

    // Stage 2: Fallback without web search (faster, estimates)
    setCompStatus(lang==="ja"?"推定データを生成中…":"Generating market estimates…");
    try {
      const resp = await fetchWithTimeout({
        model: "claude-sonnet-4-20250514", max_tokens: 4096,
        messages: [{ role: "user", content: basePrompt }],
      }, 30000);

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        setAiError(errData?.error?.message || `API error ${resp.status}`);
        setLoadingComps(false);
        setCompStatus("");
        return;
      }
      const data = await resp.json();
      const text = extractResult(data);
      if (!text) { setAiError("Empty response from AI"); setLoadingComps(false); setCompStatus(""); return; }
      
      const comps = parseComps(text);
      if (comps && comps.length > 0) {
        onChange({ ...p, rentComps: comps });
      } else {
        setAiError(`Could not parse results. Raw: ${text.substring(0, 300)}...`);
        onChange({ ...p, rentComps: [] });
      }
    } catch(e) {
      setAiError(e.name === "AbortError" ? "Request timed out. Try a broader search area or fewer results." : `Error: ${e.message}`);
    }
    setCompStatus("");
    setLoadingComps(false);
  };

  const generateCatchCopy = async () => {
    setLoadingCatch(true);
    const summary = buildPropertySummary();
    const prompt = `You are an expert real estate copywriter specializing in the Japanese luxury property market. Create compelling catch copy for this ${p.type === "rental" ? "rental" : "sale"} property:

${summary}

Generate catch copy in three languages. Return ONLY a JSON object with no other text:
{"en":"[English catch copy - 1-2 compelling sentences, luxury tone]","ja":"[Japanese catch copy - natural, appealing Japanese real estate language]","zh":"[Traditional Chinese catch copy - elegant, appealing to HK/TW buyers]"}`;

    const result = await callClaude(prompt);
    try {
      const cleaned = result.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      onChange({ ...p, catchCopy: parsed });
    } catch { onChange({ ...p, catchCopy: { en: result, ja: "", zh: "" } }); }
    setLoadingCatch(false);
  };

  const generateSellingPoints = async () => {
    setLoadingSell(true);
    const summary = buildPropertySummary();
    const prompt = `You are an expert real estate copywriter for the Japanese luxury property market. Generate compelling selling points for this ${p.type === "rental" ? "rental" : "sale"} property:

${summary}

Create 5-7 selling points in three languages. Return ONLY a JSON object:
{"en":"[English: bullet-style selling points, each on new line with • prefix]","ja":"[Japanese: same selling points in natural Japanese]","zh":"[Traditional Chinese: same selling points for HK/TW audience]"}

Focus on lifestyle benefits, location advantages, investment potential, and unique features. ${p.type === "rental" ? "Emphasize value for money, convenience, and lifestyle benefits for renters." : ""}`;

    const result = await callClaude(prompt);
    try {
      const cleaned = result.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      onChange({ ...p, sellingPoints: parsed });
    } catch { onChange({ ...p, sellingPoints: { en: result, ja: "", zh: "" } }); }
    setLoadingSell(false);
  };

  const goldBtn = (onClick, label, loading) => (
    <div onClick={loading ? undefined : onClick} style={{
      padding: "10px 22px", background: loading ? C.bgCard : `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
      color: loading ? C.textDim : C.bg, fontSize: 12, fontFamily: F.body, fontWeight: 500,
      letterSpacing: 1, cursor: loading ? "wait" : "pointer", borderRadius: 4, textAlign: "center", transition: "all 0.2s",
    }}>{loading ? t.generating : label}</div>
  );

  const resultBox = (label, value, onApply) => {
    const text = getLangVal(value, lang);
    if (!text) return null;
    return (
      <div style={{ marginTop: 16, padding: 20, background: C.bgCard, borderRadius: 8, border: `1px solid ${C.borderFaint}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.gold, fontFamily: F.body, fontWeight: 300 }}>{label}</div>
          <span style={{ fontSize: 9, padding: "2px 8px", background: "rgba(196,164,112,0.1)", border: `1px solid ${C.borderFaint}`, borderRadius: 3, color: C.textDim, fontFamily: F.body }}>{t.aiGenerated}</span>
        </div>
        <div style={{ fontSize: 14, fontFamily: F.accent, fontWeight: 400, color: C.text, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{text}</div>
        {onApply && <div onClick={onApply} style={{ marginTop: 12, fontSize: 11, fontFamily: F.body, fontWeight: 400, color: C.gold, cursor: "pointer", letterSpacing: 0.5 }}>→ {t.applyToDescription}</div>}
      </div>
    );
  };

  const chipS = (active) => ({padding:"5px 14px",fontSize:11,fontFamily:F.body,fontWeight:active?500:300,color:active?C.bg:C.textDim,background:active?C.gold:"transparent",border:`1px solid ${active?C.gold:C.border}`,borderRadius:4,cursor:"pointer"});
  const miniInput = {...iS, padding:"6px 10px",fontSize:12};
  const miniLabel = {fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:C.textFaint,fontFamily:F.body,fontWeight:300,marginBottom:4};

  return (
    <div>
      <div style={{ fontSize: 13, fontFamily: F.body, fontWeight: 300, color: C.textDim, marginBottom: 24, lineHeight: 1.6 }}>
        {lang === "ja" ? "AIを活用して物件のキャッチコピー、セールスポイントの生成や周辺相場の検索を行います。" : lang === "zh" ? "利用AI自動生成物業宣傳標語、賣點，並搜尋周邊市場行情。" : "Use AI to generate catch copy, selling points, and search for comparable properties in the area."}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        {goldBtn(generateCatchCopy, t.generateCatchCopy, loadingCatch)}
        {goldBtn(generateSellingPoints, t.generateSellingPoints, loadingSell)}
      </div>

      {resultBox(t.catchCopy, p.catchCopy, () => onChange({ ...p, description: { ...p.description, [lang]: getLangVal(p.catchCopy, lang) } }))}
      {resultBox(t.sellingPoints, p.sellingPoints)}

      {/* Comparable search with filters */}
      <div style={{marginTop:28,padding:24,background:C.bgCard,borderRadius:8,border:`1px solid ${C.borderFaint}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300}}>{isRental ? t.findComparableRents : t.findComparableSales}</div>
          <div onClick={()=>setShowFilters(!showFilters)} style={{fontSize:11,fontFamily:F.body,fontWeight:400,color:C.gold,cursor:"pointer"}}>{showFilters ? "▲ " : "▼ "}{lang==="ja"?"検索条件":lang==="zh"?"搜尋條件":"Search Filters"}</div>
        </div>

        {showFilters && (<div style={{marginBottom:20}}>
          {/* Area */}
          <div style={{marginBottom:12}}>
            <div style={miniLabel}>{lang==="ja"?"検索エリア":lang==="zh"?"搜尋區域":"Search Area"}</div>
            <input style={miniInput} value={cf.area} onChange={e=>setCF("area",e.target.value)} placeholder={lang==="ja"?"例：ニセコ、倶知安町":"e.g. Niseko, Kutchan"} />
          </div>

          {/* Radius */}
          <div style={{marginBottom:12}}>
            <div style={miniLabel}>{lang==="ja"?"検索半径":lang==="zh"?"搜尋半徑":"Search Radius"}</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {[["1","1km"],["3","3km"],["5","5km"],["10","10km"],["20","20km"],["50",lang==="ja"?"同一市区町村":"Same City"]].map(([v,l])=>(
                <div key={v} onClick={()=>setCF("radius",v)} style={chipS(cf.radius===v)}>{l}</div>
              ))}
            </div>
          </div>

          {/* Size range */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div>
              <div style={miniLabel}>{lang==="ja"?"面積下限 (㎡)":"Size Min (sqm)"}</div>
              <input style={miniInput} type="number" value={cf.sizeMin} onChange={e=>setCF("sizeMin",e.target.value)} placeholder="e.g. 50" />
            </div>
            <div>
              <div style={miniLabel}>{lang==="ja"?"面積上限 (㎡)":"Size Max (sqm)"}</div>
              <input style={miniInput} type="number" value={cf.sizeMax} onChange={e=>setCF("sizeMax",e.target.value)} placeholder="e.g. 500" />
            </div>
          </div>

          {/* Price range */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div>
              <div style={miniLabel}>{isRental?(lang==="ja"?"賃料下限":"Rent Min"):(lang==="ja"?"価格下限":"Price Min")} (¥)</div>
              <input style={miniInput} type="number" value={cf.priceMin} onChange={e=>setCF("priceMin",e.target.value)} placeholder={isRental?"e.g. 100000":"e.g. 50000000"} />
            </div>
            <div>
              <div style={miniLabel}>{isRental?(lang==="ja"?"賃料上限":"Rent Max"):(lang==="ja"?"価格上限":"Price Max")} (¥)</div>
              <input style={miniInput} type="number" value={cf.priceMax} onChange={e=>setCF("priceMax",e.target.value)} placeholder={isRental?"e.g. 500000":"e.g. 500000000"} />
            </div>
          </div>

          {/* Year range */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
            <div>
              <div style={miniLabel}>{lang==="ja"?"築年数（始）":"Year Built From"}</div>
              <input style={miniInput} type="number" value={cf.yearMin} onChange={e=>setCF("yearMin",e.target.value)} placeholder="e.g. 1990" />
            </div>
            <div>
              <div style={miniLabel}>{lang==="ja"?"築年数（終）":"Year Built To"}</div>
              <input style={miniInput} type="number" value={cf.yearMax} onChange={e=>setCF("yearMax",e.target.value)} placeholder="e.g. 2025" />
            </div>
          </div>

          {/* Property types */}
          <div style={{marginBottom:16}}>
            <div style={miniLabel}>{lang==="ja"?"含む物件タイプ":"Include Property Types"}</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {[["residential",lang==="ja"?"住居":"Residential"],["office",lang==="ja"?"オフィス":"Office"],["retail",lang==="ja"?"店舗":"Retail"],["mixed",lang==="ja"?"複合":"Mixed"],["land",lang==="ja"?"土地":"Land"]].map(([k,l])=>(
                <div key={k} onClick={()=>toggleType(k)} style={chipS(cf.types.includes(k))}>{l}</div>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div>
            <div style={miniLabel}>{lang==="ja"?"表示件数":"Results"}</div>
            <div style={{display:"flex",gap:6}}>
              {["4","6","8","10"].map(n=>(
                <div key={n} onClick={()=>setCF("resultsCount",n)} style={chipS(cf.resultsCount===n)}>{n}</div>
              ))}
            </div>
          </div>
        </div>)}

        {goldBtn(searchComps, loadingComps ? (compStatus || t.generating) : (lang==="ja"?"🔍 相場検索":lang==="zh"?"🔍 搜尋行情":"🔍 Search Comparables"), loadingComps)}
        {loadingComps && compStatus && <div style={{fontSize:11,fontFamily:F.body,fontWeight:300,color:C.textDim,marginTop:8,fontStyle:"italic"}}>{compStatus}</div>}
        {!cf.area && !loadingComps && <div style={{fontSize:11,fontFamily:F.body,fontWeight:300,color:C.danger,marginTop:8}}>{lang==="ja"?"エリアを入力してください":"Please enter a search area"}</div>}
        {aiError && <div style={{marginTop:10,padding:"10px 14px",background:"rgba(196,64,64,0.1)",border:`1px solid rgba(196,64,64,0.3)`,borderRadius:6,fontSize:11,fontFamily:F.body,fontWeight:300,color:"#e88",lineHeight:1.5,wordBreak:"break-all"}}><strong>Error:</strong> {aiError}</div>}
      </div>

      {/* Comps */}
      {p.rentComps?.length > 0 && (() => {
        const ck = compLang; // en, ja, zh
        return (
        <div style={{ marginTop: 16, padding: 20, background: C.bgCard, borderRadius: 8, border: `1px solid ${C.borderFaint}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.gold, fontFamily: F.body, fontWeight: 300 }}>{isRental ? t.comparableRents : t.comparableSales}</div>
            <div style={{ display: "flex", gap: 4 }}>
              {[["en","EN"],["ja","日本語"],["zh","中文"]].map(([k,l])=>(
                <span key={k} onClick={()=>setCompLang(k)} style={{padding:"3px 10px",fontSize:10,fontFamily:F.body,fontWeight:compLang===k?500:300,color:compLang===k?C.bg:C.textDim,background:compLang===k?C.gold:"transparent",border:`1px solid ${compLang===k?C.gold:C.borderFaint}`,borderRadius:3,cursor:"pointer"}}>{l}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {p.rentComps.map((comp, i) => {
              const cName = (ck==="ja"?(comp.nj||comp.name_ja):(ck==="zh"?(comp.nz||comp.name_zh):(comp.n||comp.name_en))) || comp.n || comp.name || "";
              const cLoc = (ck==="ja"?(comp.locj||comp.location_ja):(ck==="zh"?(comp.locz||comp.location_zh):(comp.loc||comp.location_en))) || comp.loc || comp.location || "";
              const cNotes = (ck==="ja"?(comp.notej||comp.notes_ja):(ck==="zh"?(comp.notez||comp.notes_zh):(comp.note||comp.notes_en))) || comp.note || comp.notes || "";
              const cType = (ck==="ja"?(comp.typej||comp.type_ja):(comp.type||comp.type_en)) || comp.type || "";
              return (
              <div key={i} style={{ padding: "12px 0", borderBottom: i < p.rentComps.length - 1 ? `1px solid ${C.borderFaint}` : "none" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", gap: 12, alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 13, fontFamily: F.body, fontWeight: 400, color: C.text }}>{cName}</div>
                    <div style={{ fontSize: 11, fontFamily: F.body, fontWeight: 200, color: C.textFaint }}>{cLoc}</div>
                    {cType && <span style={{fontSize:9,fontFamily:F.body,fontWeight:400,color:C.gold,background:"rgba(196,164,112,0.1)",padding:"1px 6px",borderRadius:2,marginTop:3,display:"inline-block"}}>{cType}</span>}
                  </div>
                  <div style={{ fontSize: 15, fontFamily: F.accent, fontWeight: 600, color: C.gold }}>{comp.rent || comp.price || "—"}</div>
                  <div style={{ fontSize: 12, fontFamily: F.body, fontWeight: 300, color: C.textDim }}>{comp.size}</div>
                  <div style={{ fontSize: 11, fontFamily: F.body, fontWeight: 200, color: C.textFaint, fontStyle: "italic" }}>{cNotes}</div>
                </div>
                {(comp.url||comp.source_url) && <a href={comp.url||comp.source_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, fontFamily: F.body, fontWeight: 300, color: C.gold, opacity: 0.7, textDecoration: "none", marginTop: 4, display: "inline-block" }}>🔗 {(comp.url||comp.source_url).replace(/https?:\/\/(www\.)?/, "").split("/")[0]}</a>}
              </div>
            );})}
          </div>
        </div>
      );})()}
    </div>
  );
}

// ─── Map Editor Component ───
const LANDMARK_CATS = [
  { key: "station", icon: "🚉", en: "Station", ja: "駅" },
  { key: "supermarket", icon: "🛒", en: "Supermarket", ja: "スーパー" },
  { key: "convenience", icon: "🏪", en: "Convenience Store", ja: "コンビニ" },
  { key: "ski", icon: "⛷", en: "Ski Resort", ja: "スキー場" },
  { key: "shopping", icon: "🛍", en: "Shopping", ja: "商業施設" },
  { key: "hospital", icon: "🏥", en: "Hospital", ja: "病院" },
  { key: "school", icon: "🏫", en: "School", ja: "学校" },
  { key: "restaurant", icon: "🍽", en: "Restaurant", ja: "レストラン" },
  { key: "park", icon: "🏞", en: "Park", ja: "公園" },
  { key: "other", icon: "📍", en: "Other", ja: "その他" },
];

function MapEditor({ property: p, onChange, t, lang }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const landmarkMarkersRef = useRef([]);
  const [mapReady, setMapReady] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [searching, setSearching] = useState(false);
  const [addingLandmark, setAddingLandmark] = useState(false);
  const [newLM, setNewLM] = useState({ name: "", category: "other", lat: "", lng: "" });

  const set = (k, v) => onChange({ ...p, [k]: v });

  // Load Leaflet dynamically
  useEffect(() => {
    if (window.L) { setMapReady(true); return; }
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(css);
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => setMapReady(true);
    script.onerror = () => setMapReady(false);
    document.head.appendChild(script);
  }, []);

  // Create gold marker icon
  const createIcon = (html, size = [28, 36]) => {
    if (!window.L) return null;
    return window.L.divIcon({ html, iconSize: size, iconAnchor: [size[0]/2, size[1]], className: "" });
  };

  // Initialize / update map
  useEffect(() => {
    if (!mapReady || !mapRef.current || !window.L) return;
    const L = window.L;
    const lat = parseFloat(p.lat) || 43.06;
    const lng = parseFloat(p.lng) || 141.35;
    const hasCoords = p.lat && p.lng;

    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, { zoomControl: true }).setView([lat, lng], hasCoords ? 15 : 5);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: "© CartoDB © OpenStreetMap", maxZoom: 19,
      }).addTo(map);
      mapInstanceRef.current = map;

      // Property marker (draggable)
      const goldPin = createIcon('<svg width="28" height="36" viewBox="0 0 28 36"><path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.27 21.73 0 14 0z" fill="#c4a470"/><circle cx="14" cy="14" r="5" fill="#fff"/></svg>');
      const marker = L.marker([lat, lng], { icon: goldPin, draggable: true }).addTo(map);
      marker.on("dragend", (e) => {
        const pos = e.target.getLatLng();
        onChange({ ...p, lat: pos.lat.toFixed(6), lng: pos.lng.toFixed(6) });
      });
      markerRef.current = marker;
      if (!hasCoords) marker.setOpacity(0.3);
    } else {
      // Update existing marker position
      if (hasCoords && markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
        markerRef.current.setOpacity(1);
        mapInstanceRef.current.setView([lat, lng], Math.max(mapInstanceRef.current.getZoom(), 14));
      }
    }

    // Update landmark markers
    landmarkMarkersRef.current.forEach(m => mapInstanceRef.current.removeLayer(m));
    landmarkMarkersRef.current = [];
    (p.landmarks || []).forEach(lm => {
      if (!lm.visible || !lm.lat || !lm.lng) return;
      const cat = LANDMARK_CATS.find(c => c.key === lm.category) || LANDMARK_CATS[9];
      const lmIcon = createIcon(`<div style="background:#fff;border:2px solid #c4a470;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,0.3)">${cat.icon}</div>`, [26, 26]);
      const m = L.marker([lm.lat, lm.lng], { icon: lmIcon }).addTo(mapInstanceRef.current);
      m.bindTooltip(lm.name, { direction: "top", offset: [0, -14] });
      landmarkMarkersRef.current.push(m);
    });
  }, [mapReady, p.lat, p.lng, p.landmarks]);

  const [mapError, setMapError] = useState("");

  // Geocode address using Claude API (works in artifact sandbox)
  const geocode = async () => {
    const addr = getLangVal(p.location, "ja") || getLangVal(p.location, "en");
    if (!addr) { setMapError(lang==="ja"?"先に「基本情報」タブで住所を入力してください":"Enter an address in the Basic Info tab first"); return; }
    setGeocoding(true);
    setMapError("");

    // Try Nominatim first (works when deployed)
    try {
      const resp = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addr)}&format=json&limit=1&countrycodes=jp`);
      const data = await resp.json();
      if (data?.[0]) {
        onChange({ ...p, lat: parseFloat(data[0].lat).toFixed(6), lng: parseFloat(data[0].lon).toFixed(6) });
        setGeocoding(false);
        return;
      }
    } catch (e) { /* Nominatim blocked in sandbox, fall through to Claude */ }

    // Fallback: use Claude API for geocoding
    try {
      const resp = await fetch("/api/claude", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 200,
          messages: [{ role: "user", content: `Return ONLY the latitude and longitude for this Japanese address as JSON: {"lat":number,"lng":number}\nAddress: ${addr}\nNo other text. Just the JSON object.` }],
        }),
      });
      const data = await resp.json();
      const text = data.content?.filter(b=>b.type==="text").map(b=>b.text).join("") || "";
      const m = text.match(/\{[\s\S]*?\}/);
      if (m) {
        const coords = JSON.parse(m[0]);
        if (coords.lat && coords.lng) {
          onChange({ ...p, lat: parseFloat(coords.lat).toFixed(6), lng: parseFloat(coords.lng).toFixed(6) });
        } else { setMapError("Could not determine coordinates"); }
      } else { setMapError("Could not parse coordinates"); }
    } catch (e) { setMapError(`Geocoding error: ${e.message}`); }
    setGeocoding(false);
  };

  // Discover nearby landmarks using Claude API
  const discoverLandmarks = async () => {
    if (!p.lat || !p.lng) return;
    setSearching(true);
    setMapError("");

    // Try Overpass API first (works when deployed)
    try {
      const r = 1500;
      const queries = [
        { tag: '"railway"="station"', cat: "station" },
        { tag: '"shop"="supermarket"', cat: "supermarket" },
        { tag: '"shop"="convenience"', cat: "convenience" },
        { tag: '"sport"="skiing"', cat: "ski" },
        { tag: '"shop"="mall"', cat: "shopping" },
        { tag: '"amenity"="hospital"', cat: "hospital" },
        { tag: '"amenity"="school"', cat: "school" },
        { tag: '"leisure"="park"', cat: "park" },
      ];
      const overpassQ = queries.map(q => `node[${q.tag}](around:${r},${p.lat},${p.lng});`).join("");
      const url = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:10];(${overpassQ});out body 50;`;
      const resp = await fetch(url);
      const data = await resp.json();
      const existing = new Set((p.landmarks || []).map(l => `${l.lat},${l.lng}`));
      const newLandmarks = [];
      (data.elements || []).forEach(el => {
        const key = `${el.lat},${el.lon}`;
        if (existing.has(key)) return;
        const name = el.tags?.name || el.tags?.["name:ja"] || el.tags?.["name:en"] || "";
        if (!name) return;
        let cat = "other";
        if (el.tags?.railway === "station") cat = "station";
        else if (el.tags?.shop === "supermarket") cat = "supermarket";
        else if (el.tags?.shop === "convenience") cat = "convenience";
        else if (el.tags?.sport === "skiing") cat = "ski";
        else if (el.tags?.shop === "mall") cat = "shopping";
        else if (el.tags?.amenity === "hospital") cat = "hospital";
        else if (el.tags?.amenity === "school") cat = "school";
        else if (el.tags?.leisure === "park") cat = "park";
        newLandmarks.push({ name, category: cat, lat: el.lat, lng: el.lon, visible: true });
        existing.add(key);
      });
      if (newLandmarks.length > 0) {
        onChange({ ...p, landmarks: [...(p.landmarks || []), ...newLandmarks] });
        setSearching(false);
        return;
      }
    } catch (e) { /* Overpass blocked in sandbox, fall through to Claude */ }

    // Fallback: use Claude API for landmark discovery
    const addr = getLangVal(p.location, "ja") || getLangVal(p.location, "en") || `${p.lat},${p.lng}`;
    try {
      const resp = await fetch("/api/claude", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 2000,
          messages: [{ role: "user", content: `List notable landmarks within 1.5km of ${addr} (lat:${p.lat}, lng:${p.lng}) in Japan. Include train stations, supermarkets, convenience stores, ski resorts, shopping centers, hospitals, schools, parks, restaurants.

Return ONLY a JSON array. No other text. Start with [ end with ].
Format: [{"name":"Name","cat":"station|supermarket|convenience|ski|shopping|hospital|school|park|restaurant|other","lat":42.86,"lng":140.70}]

Provide realistic coordinates near the given location. Include 8-15 landmarks.` }],
        }),
      });
      const data = await resp.json();
      const text = data.content?.filter(b=>b.type==="text").map(b=>b.text).join("") || "";
      const arrM = text.replace(/```json|```/g,"").trim().match(/\[[\s\S]*\]/);
      if (arrM) {
        const items = JSON.parse(arrM[0]);
        const existing = new Set((p.landmarks || []).map(l => l.name));
        const newLMs = items.filter(i => !existing.has(i.name)).map(i => ({
          name: i.name, category: i.cat || "other",
          lat: i.lat, lng: i.lng, visible: true,
        }));
        onChange({ ...p, landmarks: [...(p.landmarks || []), ...newLMs] });
      } else { setMapError("Could not parse landmark results"); }
    } catch (e) { setMapError(`Landmark search error: ${e.message}`); }
    setSearching(false);
  };

  const toggleLM = (i) => {
    const lms = [...(p.landmarks || [])];
    lms[i] = { ...lms[i], visible: !lms[i].visible };
    set("landmarks", lms);
  };
  const removeLM = (i) => set("landmarks", (p.landmarks || []).filter((_, j) => j !== i));
  const addLM = () => {
    if (!newLM.name) return;
    const lm = { ...newLM, lat: parseFloat(newLM.lat) || parseFloat(p.lat) || 0, lng: parseFloat(newLM.lng) || parseFloat(p.lng) || 0, visible: true };
    set("landmarks", [...(p.landmarks || []), lm]);
    setNewLM({ name: "", category: "other", lat: "", lng: "" });
    setAddingLandmark(false);
  };

  return (
    <div>
      {/* Geocode + Lat/Lng */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: C.textFaint, fontFamily: F.body, fontWeight: 300, marginBottom: 4 }}>{t.mapLocation}</div>
          <div style={{ fontSize: 13, fontFamily: F.body, fontWeight: 300, color: C.text }}>{getLangVal(p.location, lang) || "—"}</div>
        </div>
        <div onClick={geocode} style={{ padding: "8px 20px", background: geocoding ? "transparent" : C.gold, color: geocoding ? C.textDim : C.bg, border: `1px solid ${C.gold}`, borderRadius: 6, fontSize: 12, fontFamily: F.body, fontWeight: 500, cursor: "pointer", alignSelf: "end", opacity: geocoding ? 0.5 : 1 }}>
          {geocoding ? "..." : t.mapGeocode}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <Field label={t.mapLat}><input style={iS} type="number" step="0.000001" value={p.lat} onChange={e => set("lat", e.target.value)} placeholder="e.g. 42.8614" /></Field>
        <Field label={t.mapLng}><input style={iS} type="number" step="0.000001" value={p.lng} onChange={e => set("lng", e.target.value)} placeholder="e.g. 140.6982" /></Field>
      </div>

      {p.lat && p.lng && <div style={{ fontSize: 10, fontFamily: F.body, fontWeight: 200, color: C.textFaint, marginBottom: 8, fontStyle: "italic" }}>💡 {t.mapDragHint}</div>}

      {mapError && <div style={{marginBottom:12,padding:"10px 14px",background:"rgba(196,64,64,0.1)",border:"1px solid rgba(196,64,64,0.3)",borderRadius:6,fontSize:11,fontFamily:F.body,fontWeight:300,color:"#e88",lineHeight:1.5}}>{mapError}</div>}

      {/* Map container */}
      <div ref={mapRef} style={{ width: "100%", height: 360, borderRadius: 8, border: `1px solid ${C.border}`, marginBottom: 20, background: "#f0ebe3" }}>
        {!mapReady && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 12, fontFamily: F.body, color: C.textDim }}>
          {lang === "ja" ? "地図を読み込み中… (デプロイ後に表示)" : "Loading map… (visible after deployment)"}
        </div>}
      </div>

      {/* Landmarks section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.gold, fontFamily: F.body, fontWeight: 300 }}>{t.mapLandmarks}</div>
        <div style={{ display: "flex", gap: 8 }}>
          {p.lat && p.lng && <div onClick={discoverLandmarks} style={{ fontSize: 11, fontFamily: F.body, fontWeight: 400, color: C.gold, cursor: "pointer", opacity: searching ? 0.5 : 1 }}>
            {searching ? "⏳" : "🔍"} {t.mapSearchLandmarks}
          </div>}
          <div onClick={() => setAddingLandmark(!addingLandmark)} style={{ fontSize: 11, fontFamily: F.body, fontWeight: 400, color: C.gold, cursor: "pointer" }}>{t.mapAddLandmark}</div>
        </div>
      </div>

      {/* Add landmark form */}
      {addingLandmark && (
        <div style={{ padding: 16, background: C.bgCard, borderRadius: 8, border: `1px solid ${C.borderFaint}`, marginBottom: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10, marginBottom: 10 }}>
            <input style={{ ...iS, padding: "6px 10px", fontSize: 12 }} value={newLM.name} onChange={e => setNewLM({ ...newLM, name: e.target.value })} placeholder={lang === "ja" ? "施設名" : "Landmark name"} />
            <select style={{ ...iS, padding: "6px 10px", fontSize: 12, appearance: "none", cursor: "pointer" }} value={newLM.category} onChange={e => setNewLM({ ...newLM, category: e.target.value })}>
              {LANDMARK_CATS.map(c => <option key={c.key} value={c.key}>{c.icon} {lang === "ja" ? c.ja : c.en}</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10 }}>
            <input style={{ ...iS, padding: "6px 10px", fontSize: 12 }} type="number" step="0.000001" value={newLM.lat} onChange={e => setNewLM({ ...newLM, lat: e.target.value })} placeholder="Lat (optional)" />
            <input style={{ ...iS, padding: "6px 10px", fontSize: 12 }} type="number" step="0.000001" value={newLM.lng} onChange={e => setNewLM({ ...newLM, lng: e.target.value })} placeholder="Lng (optional)" />
            <div onClick={addLM} style={{ padding: "6px 16px", background: C.gold, color: C.bg, borderRadius: 4, fontSize: 12, fontFamily: F.body, fontWeight: 500, cursor: "pointer" }}>Add</div>
          </div>
        </div>
      )}

      {/* Landmark list */}
      {(p.landmarks || []).length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {(p.landmarks || []).map((lm, i) => {
            const cat = LANDMARK_CATS.find(c => c.key === lm.category) || LANDMARK_CATS[9];
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: lm.visible ? C.bgCard : "transparent", borderRadius: 6, border: `1px solid ${lm.visible ? C.borderFaint : "transparent"}`, opacity: lm.visible ? 1 : 0.4 }}>
                <span style={{ fontSize: 16, cursor: "pointer" }} onClick={() => toggleLM(i)}>{cat.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontFamily: F.body, fontWeight: 400, color: C.text }}>{lm.name}</div>
                  <div style={{ fontSize: 10, fontFamily: F.body, fontWeight: 200, color: C.textFaint }}>{lang === "ja" ? cat.ja : cat.en}</div>
                </div>
                <div onClick={() => toggleLM(i)} style={{ fontSize: 10, fontFamily: F.body, fontWeight: 300, color: lm.visible ? C.gold : C.textFaint, cursor: "pointer", padding: "3px 8px", border: `1px solid ${lm.visible ? C.gold : C.border}`, borderRadius: 3 }}>
                  {lm.visible ? "ON" : "OFF"}
                </div>
                <div onClick={() => removeLM(i)} style={{ fontSize: 14, color: C.danger, cursor: "pointer", padding: "0 4px" }}>×</div>
              </div>
            );
          })}
        </div>
      )}
      {(p.landmarks || []).length === 0 && !addingLandmark && (
        <div style={{ padding: 20, textAlign: "center", fontSize: 12, fontFamily: F.body, fontWeight: 200, color: C.textFaint }}>
          {p.lat && p.lng ? (lang === "ja" ? "「周辺自動検索」で近くの施設を検索、または手動で追加" : "Click 'Auto-Discover' to find nearby landmarks, or add manually") : (lang === "ja" ? "まず「地図で検索」を押して物件の位置を設定してください" : "First click 'Find on Map' to set the property location")}
        </div>
      )}
    </div>
  );
}

// ─── Units Table Editor ───
function UnitsEditor({ units, onChange, t }) {
  const add = () => onChange([...units, { no: "", type: "", area: "", price: "", floor: "", status: "available", view: "" }]);
  const upd = (i, k, v) => { const u = [...units]; u[i] = { ...u[i], [k]: v }; onChange(u); };
  const del = (i) => onChange(units.filter((_, j) => j !== i));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.gold, fontFamily: F.body, fontWeight: 300 }}>{t.unitTable}</div>
        <div onClick={add} style={{ fontSize: 11, fontFamily: F.body, fontWeight: 400, color: C.gold, cursor: "pointer" }}>+ {t.addUnit}</div>
      </div>
      {units.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "80px 100px 80px 120px 60px 100px 120px 30px", gap: 6, marginBottom: 8 }}>
            {[t.unitNo, t.unitType, t.unitArea, t.unitPrice, t.unitFloor, t.unitStatus, t.unitView, ""].map((h, i) => (
              <div key={i} style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: C.textFaint, fontFamily: F.body, fontWeight: 300 }}>{h}</div>
            ))}
          </div>
          {units.map((u, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 100px 80px 120px 60px 100px 120px 30px", gap: 6, marginBottom: 6 }}>
              <input style={{ ...iS, padding: "6px 8px", fontSize: 12 }} value={u.no} onChange={e => upd(i, "no", e.target.value)} placeholder="101" />
              <input style={{ ...iS, padding: "6px 8px", fontSize: 12 }} value={u.type} onChange={e => upd(i, "type", e.target.value)} placeholder="2LDK" />
              <input style={{ ...iS, padding: "6px 8px", fontSize: 12 }} type="number" value={u.area} onChange={e => upd(i, "area", e.target.value)} />
              <input style={{ ...iS, padding: "6px 8px", fontSize: 12 }} value={u.price} onChange={e => upd(i, "price", e.target.value)} placeholder="¥85,000,000" />
              <input style={{ ...iS, padding: "6px 8px", fontSize: 12 }} value={u.floor} onChange={e => upd(i, "floor", e.target.value)} placeholder="3F" />
              <select style={{ ...selS, padding: "6px 8px", fontSize: 12 }} value={u.status} onChange={e => upd(i, "status", e.target.value)}>
                <option value="available">{t.available}</option>
                <option value="reserved">{t.reserved}</option>
                <option value="sold">{t.sold}</option>
              </select>
              <input style={{ ...iS, padding: "6px 8px", fontSize: 12 }} value={u.view} onChange={e => upd(i, "view", e.target.value)} placeholder="South" />
              <div onClick={() => del(i)} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: C.danger, cursor: "pointer", fontSize: 14 }}>×</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Password Gate ───
function PasswordGate({ onUnlock, t }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.bg, fontFamily: F.body }}>
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        <div style={{ fontSize: 40, opacity: 0.3, marginBottom: 16 }}>
          <CMPLogo width={100} fill={C.textDim} style={{display:"inline-block"}} />
        </div>
        <div style={{ fontSize: 16, fontFamily: F.accent, color: C.text, marginBottom: 6 }}>{t.passwordRequired}</div>
        <div style={{ fontSize: 12, color: C.textDim, marginBottom: 24 }}>{t.enterPassword}</div>
        <input type="password" style={{ ...iS, textAlign: "center", marginBottom: 12 }} value={pw} onChange={e => { setPw(e.target.value); setErr(false); }}
          onKeyDown={e => { if (e.key === "Enter") onUnlock(pw) ? null : setErr(true); }} />
        {err && <div style={{ fontSize: 12, color: C.danger, marginBottom: 12 }}>{t.passwordIncorrect}</div>}
        <div onClick={() => onUnlock(pw) ? null : setErr(true)} style={{
          padding: "12px 40px", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
          color: C.bg, fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
          fontFamily: F.body, fontWeight: 500, cursor: "pointer", display: "inline-block",
        }}>{t.unlock}</div>
      </div>
    </div>
  );
}

// ─── Analytics Dashboard ───
function AnalyticsView({ properties, t }) {
  const allViews = properties.flatMap(p => (p.views || []).map(v => ({ ...v, propName: getLangVal(p.name, "en") || "Untitled", propId: p.id })));
  const now = new Date();
  const today = allViews.filter(v => new Date(v.time).toDateString() === now.toDateString()).length;
  const weekAgo = new Date(now - 7 * 86400000);
  const week = allViews.filter(v => new Date(v.time) > weekAgo).length;
  const sessions = new Set(allViews.map(v => v.session)).size;

  const perProp = {};
  allViews.forEach(v => { perProp[v.propId] = perProp[v.propId] || { name: v.propName, count: 0 }; perProp[v.propId].count++; });

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
        {[[t.totalViews, allViews.length], [t.viewsToday, today], [t.viewsWeek, week], [t.uniqueVisitors, sessions]].map(([l, v]) => (
          <div key={l} style={{ background: C.bgCard, borderRadius: 10, padding: "20px 24px", border: `1px solid ${C.borderFaint}`, textAlign: "center" }}>
            <div style={{ fontSize: 28, fontFamily: F.accent, fontWeight: 600, color: C.gold }}>{v}</div>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.textDim, fontFamily: F.body, fontWeight: 300, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      {Object.keys(perProp).length > 0 ? (
        <div>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.gold, fontFamily: F.body, fontWeight: 300, marginBottom: 16 }}>Views by Property</div>
          {Object.values(perProp).sort((a, b) => b.count - a.count).map((pp, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
              <div style={{ flex: 1, fontSize: 14, fontFamily: F.body, fontWeight: 400, color: C.text }}>{pp.name}</div>
              <div style={{ width: 200, height: 6, background: C.borderFaint, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.min(100, (pp.count / Math.max(...Object.values(perProp).map(x => x.count))) * 100)}%`, background: `linear-gradient(90deg, ${C.gold}, ${C.goldDark})`, borderRadius: 3 }} />
              </div>
              <div style={{ width: 40, textAlign: "right", fontSize: 14, fontFamily: F.accent, fontWeight: 600, color: C.gold }}>{pp.count}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 14, fontFamily: F.accent, color: C.textDim }}>{t.noViews}</div>
        </div>
      )}
    </div>
  );
}

// ─── Presentation View (Luxury Noir) ───
function PresentationView({ property: p, lang, onInterest }) {
  const t = T[lang] || T.en;
  const nm = getLangVal(p.name, lang);
  const nmSub = lang === "en" ? (p.name?.ja || p.name?.zh || "") : (p.name?.en || "");
  const loc = getLangVal(p.location, lang);
  const desc = getLangVal(p.description, lang);
  const catchCopy = getLangVal(p.catchCopy, lang);
  const sellingPts = getLangVal(p.sellingPoints, lang);
  const feats = p.features ? p.features.split(",").map(f => f.trim()).filter(Boolean) : [];
  const heroImg = p.heroImages?.[0]?.data;
  const isRental = p.type === "rental";
  const isBuilding = p.type === "building";
  const [interestOpen, setInterestOpen] = useState(false);
  const [form, setForm] = useState({ name:"",email:"",phone:"",lang,budget:"",use:"",message:"",consent:false });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => { if(!form.name||!form.email||!form.consent) return; onInterest?.({...form,propertyId:p.id,propertyName:nm,date:new Date().toISOString()}); setSubmitted(true); };
  const catLabels = {residential:{en:"Residential",ja:"住居",zh:"住宅"},retail:{en:"Retail",ja:"店舗",zh:"零售"},office:{en:"Office",ja:"オフィス",zh:"辦公"},mixed:{en:"Mixed-Use",ja:"複合",zh:"複合"}};
  const typeLabel = p.type === "development" ? (lang==="ja"?"開発案件":lang==="zh"?"開發項目":"Development") : isRental ? (lang==="ja"?"賃貸":lang==="zh"?"租賃":"For Rent") : isBuilding ? (lang==="ja"?`一棟売り・${catLabels[p.buildingCategory]?.ja||""}`:lang==="zh"?`整棟・${catLabels[p.buildingCategory]?.zh||""}`:`Building · ${catLabels[p.buildingCategory]?.en||""}`) : (lang==="ja"?"売買":lang==="zh"?"出售":"For Sale");

  return (
    <div data-presentation="true" style={{ background: C.bg, color: C.text, fontFamily: F.display, minHeight: "100%" }}>
      {/* Hero */}
      <div style={{ position:"relative",height:heroImg?480:380, background:heroImg?`url(${heroImg}) center/cover`:`linear-gradient(135deg,#1a1510,${C.bg},#151210)`, overflow:"hidden", borderBottom:`1px solid ${C.border}` }}>
        {heroImg && <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,#0d0b08,rgba(13,11,8,0.5) 40%,rgba(13,11,8,0.2))"}} />}
        <div style={{position:"absolute",top:32,left:40,right:40,display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:2}}>
          <CMPLogo width={80} />
          <div style={{fontSize:11,letterSpacing:3,textTransform:"uppercase",color:C.textFaint,fontFamily:F.body,fontWeight:200}}>{typeLabel}</div>
        </div>
        <div style={{position:"absolute",bottom:48,left:40,zIndex:2,maxWidth:"60%"}}>
          <div style={{fontSize:13,letterSpacing:5,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300,marginBottom:14}}>{loc.split(",").slice(-2).join(" · ").trim()||"Location"}</div>
          <h1 style={{fontSize:42,fontWeight:400,lineHeight:1.12,margin:0,fontStyle:"italic",color:C.white}}>{nm||"Property Name"}</h1>
          {nmSub && <div style={{fontSize:17,fontFamily:F.accent,fontWeight:300,color:C.textDim,marginTop:8,letterSpacing:1}}>{nmSub}</div>}
        </div>
      </div>

      {/* Price bar */}
      <div style={{padding:"28px 40px",display:"flex",alignItems:"baseline",gap:20,borderBottom:`1px solid ${C.borderFaint}`,background:"linear-gradient(180deg,rgba(196,164,112,0.04),transparent)",flexWrap:"wrap"}}>
        {isRental ? (
          <>
            <span style={{fontSize:34,fontWeight:700,color:C.gold,fontFamily:F.accent}}>{fmtPrice(p.monthlyRent,"JPY")}</span>
            <span style={{fontSize:16,fontFamily:F.body,fontWeight:200,color:C.textDim}}>{t.perMonth}</span>
          </>
        ) : (
          <span style={{fontSize:34,fontWeight:700,color:C.gold,fontFamily:F.accent}}>{fmtPrice(p.price,p.currency)||"Price TBD"}</span>
        )}
        <div style={{flex:1}} />
        <div style={{display:"flex",gap:36}}>
          {isBuilding && p.totalFloors && <div style={{textAlign:"center"}}><div style={{fontSize:24,fontFamily:F.accent,fontWeight:600,color:C.white}}>{p.totalFloors}</div><div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:C.textFaint,fontFamily:F.body,fontWeight:200}}>{lang==="ja"?"階":lang==="zh"?"層":"Floors"}</div></div>}
          {isBuilding && p.bedrooms && <div style={{textAlign:"center"}}><div style={{fontSize:24,fontFamily:F.accent,fontWeight:600,color:C.white}}>{p.bedrooms}</div><div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:C.textFaint,fontFamily:F.body,fontWeight:200}}>{lang==="ja"?"区画":lang==="zh"?"單位":"Units"}</div></div>}
          {!isBuilding && p.bedrooms && <div style={{textAlign:"center"}}><div style={{fontSize:24,fontFamily:F.accent,fontWeight:600,color:C.white}}>{p.bedrooms}</div><div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:C.textFaint,fontFamily:F.body,fontWeight:200}}>{t.bedrooms}</div></div>}
          {!isBuilding && p.bathrooms && <div style={{textAlign:"center"}}><div style={{fontSize:24,fontFamily:F.accent,fontWeight:600,color:C.white}}>{p.bathrooms}</div><div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:C.textFaint,fontFamily:F.body,fontWeight:200}}>{t.bathrooms}</div></div>}
        </div>
      </div>

      {/* Rental quick stats */}
      {isRental && (p.deposit||p.keyMoney||p.managementFee||p.leaseTerm) && (
        <div style={{padding:"20px 40px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,borderBottom:`1px solid ${C.borderFaint}`}}>
          {[[t.depositLabel,p.deposit],[t.keyMoneyLabel,p.keyMoney],[t.mgmtFeeLabel,p.managementFee?`¥${parseInt(p.managementFee).toLocaleString()}`:""],[t.leaseLabel,p.leaseTerm]].filter(([,v])=>v).map(([l,v])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:16,fontFamily:F.accent,fontWeight:500,color:C.white}}>{v}</div>
              <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:C.textFaint,fontFamily:F.body,fontWeight:200,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      )}

      {/* Catch copy */}
      {catchCopy && (
        <div style={{padding:"32px 40px",borderBottom:`1px solid ${C.borderFaint}`}}>
          <p style={{fontSize:20,fontFamily:F.accent,fontWeight:500,lineHeight:1.6,color:C.gold,margin:0,fontStyle:"italic",maxWidth:700}}>{catchCopy}</p>
        </div>
      )}

      {/* Description */}
      {desc && (
        <div style={{padding:"28px 40px",borderBottom:`1px solid ${C.borderFaint}`}}>
          <p style={{fontSize:15,fontFamily:F.accent,fontWeight:300,lineHeight:1.8,color:C.text,margin:0,maxWidth:700}}>{desc}</p>
        </div>
      )}

      {/* Selling points */}
      {sellingPts && (
        <div style={{padding:"28px 40px",borderBottom:`1px solid ${C.borderFaint}`}}>
          <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300,marginBottom:16}}>{t.sellingPoints}</div>
          <div style={{fontSize:14,fontFamily:F.accent,fontWeight:400,lineHeight:2,color:C.text,whiteSpace:"pre-wrap",maxWidth:700}}>{sellingPts}</div>
        </div>
      )}

      {/* Gallery */}
      {p.galleryImages?.length > 0 && (
        <div style={{padding:"28px 40px",display:"grid",gridTemplateColumns:p.galleryImages.length===1?"1fr":"1fr 1fr",gap:12,borderBottom:`1px solid ${C.borderFaint}`}}>
          {p.galleryImages.map((img,i)=><img key={i} src={img.data} alt="" style={{width:"100%",height:220,objectFit:"cover",borderRadius:4,opacity:0.9}} />)}
        </div>
      )}

      {/* Details grid */}
      <div style={{padding:"36px 40px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px 56px"}}>
        {[
          [lang==="ja"?"土地面積":lang==="zh"?"土地面積":"Land Area", fmtArea(p.landArea)],
          [lang==="ja"?"建物面積":lang==="zh"?"建築面積":"Building Area", fmtArea(p.buildingArea)],
          [lang==="ja"?"構造":lang==="zh"?"建築結構":"Structure", p.structure],
          [lang==="ja"?"用途地域":lang==="zh"?"用途區域":"Zoning", p.zoning],
          [(lang==="ja"?"建ぺい率・容積率":lang==="zh"?"建蔽率・容積率":"Coverage / FAR"), (p.coverageRatio&&p.floorAreaRatio)?`${p.coverageRatio}% / ${p.floorAreaRatio}%`:""],
          [lang==="ja"?"現況":"Status", p.currentStatus],
          ...(p.type==="development"?[["Completion",p.completionDate],["Developer",p.developer]]:[]),
          ...(isBuilding?[
            [lang==="ja"?"総階数":lang==="zh"?"總樓層":"Total Floors", p.totalFloors],
            [lang==="ja"?"賃貸可能面積":"Net Leasable Area", p.netLeasableArea ? fmtArea(p.netLeasableArea) : ""],
          ]:[]),
          ...(isRental?[
            [t.availableFrom, p.availableFrom],
            [t.petPolicy, p.petPolicy],
            [t.parkingIncluded, p.parkingIncluded],
            [t.furnished, p.furnished],
          ]:[]),
        ].filter(([,v])=>v).map(([label,val])=>(
          <div key={label} style={{borderBottom:`1px solid ${C.borderFaint}`,paddingBottom:16}}>
            <div style={{fontSize:10,letterSpacing:2.5,textTransform:"uppercase",color:`${C.gold}99`,fontFamily:F.body,fontWeight:300,marginBottom:6}}>{label}</div>
            <div style={{fontSize:16,fontFamily:F.accent,fontWeight:400,color:C.text}}>{val}</div>
          </div>
        ))}
      </div>

      {/* Floor Breakdown (Building type) */}
      {isBuilding && p.floors?.length > 0 && (
        <div style={{padding:"28px 40px",borderTop:`1px solid ${C.borderFaint}`}}>
          <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300,marginBottom:20}}>{lang==="ja"?"フロア構成":lang==="zh"?"樓層配置":"Floor Breakdown"}</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontFamily:F.body}}>
              <thead><tr>
                {[lang==="ja"?"階":lang==="zh"?"樓":"Floor",lang==="ja"?"号室":"Unit",lang==="ja"?"面積":"Area",lang==="ja"?"面積 (坪)":"Tsubo",lang==="ja"?"用途":lang==="zh"?"用途":"Usage"].map(h=>(
                  <th key={h} style={{textAlign:"left",padding:"8px 12px",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:C.textFaint,fontWeight:300,borderBottom:`1px solid ${C.border}`}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {p.floors.map((fl,fi)=>{
                  const flUnits = fl.units||[];
                  const floorArea = flUnits.reduce((s,u) => s + (parseFloat(u.area)||0), 0);
                  if (flUnits.length === 0) {
                    return (<tr key={fi} style={{borderBottom:`1px solid ${C.borderFaint}`}}>
                      <td style={{padding:"10px 12px",fontSize:14,fontFamily:F.accent,fontWeight:500,color:C.white}}>{fl.label}</td>
                      <td style={{padding:"10px 12px",fontSize:13,fontWeight:300,color:C.textDim}}>—</td>
                      <td style={{padding:"10px 12px",fontSize:13,fontWeight:300,color:C.text}}>—</td>
                      <td style={{padding:"10px 12px",fontSize:13,fontWeight:300,color:C.textDim}}>—</td>
                      <td style={{padding:"10px 12px",fontSize:12,fontWeight:300,color:C.textDim}}>{fl.usage}</td>
                    </tr>);
                  }
                  return flUnits.map((u,ui) => (
                    <tr key={`${fi}-${ui}`} style={{borderBottom:ui===flUnits.length-1?`1px solid ${C.border}`:`1px solid ${C.borderFaint}`}}>
                      {ui===0 ? <td rowSpan={flUnits.length} style={{padding:"10px 12px",fontSize:14,fontFamily:F.accent,fontWeight:500,color:C.white,verticalAlign:"top",borderRight:`1px solid ${C.borderFaint}`}}>
                        <div>{fl.label}</div>
                        <div style={{fontSize:10,fontFamily:F.body,fontWeight:300,color:C.textFaint,marginTop:4}}>{flUnits.length} {lang==="ja"?"区画":"units"}</div>
                        <div style={{fontSize:11,fontFamily:F.accent,fontWeight:600,color:C.gold,marginTop:2}}>{floorArea.toLocaleString()} ㎡</div>
                      </td> : null}
                      <td style={{padding:"8px 12px",fontSize:13,fontWeight:400,color:C.text}}>{u.name||`${fl.label}-${ui+1}`}</td>
                      <td style={{padding:"8px 12px",fontSize:13,fontWeight:300,color:C.text}}>{u.area ? `${parseFloat(u.area).toLocaleString()} ㎡` : "—"}</td>
                      <td style={{padding:"8px 12px",fontSize:13,fontWeight:300,color:C.textDim}}>{u.area ? sqmToTsubo(u.area) : "—"}</td>
                      <td style={{padding:"8px 12px",fontSize:12,fontWeight:300,color:C.textDim}}>{u.usage||fl.usage}</td>
                    </tr>
                  ));
                })}
                <tr style={{borderTop:`2px solid ${C.border}`}}>
                  <td style={{padding:"10px 12px",fontSize:12,fontFamily:F.body,fontWeight:500,color:C.gold,letterSpacing:1}}>TOTAL</td>
                  <td style={{padding:"10px 12px",fontSize:12,fontWeight:500,color:C.white}}>{(p.floors||[]).reduce((s,f)=>s+(f.units||[]).length,0)} {lang==="ja"?"区画":"units"}</td>
                  <td style={{padding:"10px 12px",fontSize:13,fontWeight:500,color:C.white}}>{(p.floors||[]).reduce((s,f)=>s+(f.units||[]).reduce((s2,u)=>s2+(parseFloat(u.area)||0),0),0).toLocaleString()} ㎡</td>
                  <td style={{padding:"10px 12px",fontSize:13,fontWeight:300,color:C.textDim}}>{((p.floors||[]).reduce((s,f)=>s+(f.units||[]).reduce((s2,u)=>s2+(parseFloat(u.area)||0),0),0)*SQM_TO_TSUBO).toFixed(1)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Investment Metrics (Building type) */}
      {isBuilding && (p.annualIncome||p.noi||p.capRate||p.occupancyRate) && (
        <div style={{padding:"28px 40px",borderTop:`1px solid ${C.borderFaint}`}}>
          <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300,marginBottom:20}}>{lang==="ja"?"投資指標":lang==="zh"?"投資指標":"Investment Metrics"}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:20}}>
            {[
              [lang==="ja"?"年間総収入":"Annual Income", p.annualIncome ? `¥${parseInt(p.annualIncome).toLocaleString()}` : ""],
              ["NOI", p.noi ? `¥${parseInt(p.noi).toLocaleString()}` : ""],
              [lang==="ja"?"利回り":"Cap Rate", p.capRate ? `${p.capRate}%` : ""],
              [lang==="ja"?"稼働率":"Occupancy", p.occupancyRate ? `${p.occupancyRate}%` : ""],
            ].filter(([,v])=>v).map(([l,v])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontSize:20,fontFamily:F.accent,fontWeight:600,color:C.gold}}>{v}</div>
                <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:C.textFaint,fontFamily:F.body,fontWeight:200,marginTop:4}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Access */}
      {(p.nearestStation?.[lang]||p.nearestStation?.en||p.nearestAttraction?.[lang]||p.nearestAttraction?.en||p.airportAccess?.[lang]||p.airportAccess?.en) && (
        <div style={{padding:"8px 40px 32px"}}>
          <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300,marginBottom:20}}>{t.accessTitle}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
            {[[t.nearestStation,getLangVal(p.nearestStation,lang)],[t.nearestAttraction,getLangVal(p.nearestAttraction,lang)],[t.airportAccess,getLangVal(p.airportAccess,lang)]].filter(([,v])=>v).map(([l,v])=>(
              <div key={l}><div style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:C.textFaint,fontFamily:F.body,fontWeight:300,marginBottom:6}}>{l}</div><div style={{fontSize:14,fontFamily:F.accent,fontWeight:400,color:C.text,lineHeight:1.5}}>{v}</div></div>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {feats.length>0 && (
        <div style={{padding:"16px 40px 36px"}}>
          <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300,marginBottom:16}}>{t.features}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
            {feats.map(f=><span key={f} style={{padding:"8px 18px",border:`1px solid rgba(196,164,112,0.25)`,fontSize:12,fontFamily:F.body,fontWeight:300,color:C.text}}>{f}</span>)}
          </div>
        </div>
      )}

      {/* Floor plan */}
      {p.floorPlan?.length>0 && (
        <div style={{padding:"24px 40px",borderTop:`1px solid ${C.borderFaint}`}}>
          <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300,marginBottom:16}}>{t.floorPlanLabel}</div>
          {p.floorPlan.map((img,i)=><img key={i} src={img.data} alt="" style={{width:"100%",maxWidth:700,borderRadius:6,opacity:0.92}} />)}
        </div>
      )}

      {/* Units table */}
      {p.units?.length>0 && (
        <div style={{padding:"28px 40px",borderTop:`1px solid ${C.borderFaint}`}}>
          <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300,marginBottom:20}}>{t.unitTable}</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontFamily:F.body}}>
              <thead>
                <tr>{[t.unitNo,t.unitType,t.unitArea,t.unitPrice,t.unitFloor,t.unitView,t.unitStatus].map(h=>(
                  <th key={h} style={{textAlign:"left",padding:"8px 12px",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:C.textFaint,fontWeight:300,borderBottom:`1px solid ${C.border}`}}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {p.units.map((u,i)=>{
                  const sc = u.status==="available"?C.success:u.status==="reserved"?C.gold:C.danger;
                  const sl = u.status==="available"?t.available:u.status==="reserved"?t.reserved:t.sold;
                  return (<tr key={i} style={{borderBottom:`1px solid ${C.borderFaint}`}}>
                    <td style={{padding:"10px 12px",fontSize:14,fontFamily:F.accent,fontWeight:500,color:C.white}}>{u.no}</td>
                    <td style={{padding:"10px 12px",fontSize:13,fontWeight:300,color:C.text}}>{u.type}</td>
                    <td style={{padding:"10px 12px",fontSize:13,fontWeight:300,color:C.text}}>{u.area}{u.area?" ㎡":""}</td>
                    <td style={{padding:"10px 12px",fontSize:14,fontFamily:F.accent,fontWeight:600,color:C.gold}}>{u.price}</td>
                    <td style={{padding:"10px 12px",fontSize:13,fontWeight:300,color:C.text}}>{u.floor}</td>
                    <td style={{padding:"10px 12px",fontSize:13,fontWeight:300,color:C.textDim}}>{u.view}</td>
                    <td style={{padding:"10px 12px"}}><span style={{padding:"3px 10px",borderRadius:3,fontSize:10,fontWeight:500,letterSpacing:1,color:sc,border:`1px solid ${sc}40`,background:`${sc}15`}}>{sl}</span></td>
                  </tr>);
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Timeline */}
      {p.type==="development" && p.timeline?.some(t=>t.name) && (
        <div style={{padding:"28px 40px 40px",borderTop:`1px solid ${C.borderFaint}`}}>
          <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300,marginBottom:24}}>{t.constructionTimeline}</div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {p.timeline.filter(t=>t.name).map((phase,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:16}}>
                <div style={{width:150,fontSize:13,fontFamily:F.body,fontWeight:300,color:C.textDim}}>{phase.name}</div>
                <div style={{flex:1,height:4,background:"rgba(196,164,112,0.1)",position:"relative",borderRadius:2}}>
                  <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${phase.progress||0}%`,background:`linear-gradient(90deg,${C.gold},${C.goldDark})`,borderRadius:2}} />
                </div>
                <div style={{width:50,textAlign:"center",fontSize:11,fontFamily:F.body,fontWeight:500,color:phase.progress>0?C.gold:C.textFaint}}>{phase.progress||0}%</div>
                <div style={{width:90,textAlign:"right",fontSize:11,fontFamily:F.body,fontWeight:200,color:C.textFaint}}>{phase.start||"—"}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Agent */}
      {(p.agentName||p.companyName) && (
        <div style={{padding:"28px 40px",borderTop:`1px solid ${C.borderFaint}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
          <div>{p.companyName&&<div style={{fontSize:14,fontFamily:F.body,fontWeight:400,color:C.text,marginBottom:4}}>{p.companyName}</div>}
            {p.agentName&&<div style={{fontSize:13,fontFamily:F.body,fontWeight:300,color:C.textDim}}>{p.agentName}{p.agentContact?` · ${p.agentContact}`:""}</div>}</div>
          {p.licenseNo&&<div style={{fontSize:10,fontFamily:F.body,fontWeight:200,color:C.textFaint,letterSpacing:1}}>{p.licenseNo}</div>}
        </div>
      )}

      {/* Interest CTA */}
      <div className="no-print" style={{padding:"36px 40px 48px",borderTop:`1px solid ${C.border}`,textAlign:"center"}}>
        {!interestOpen&&!submitted&&(
          <><div onClick={()=>setInterestOpen(true)} style={{display:"inline-block",padding:"15px 52px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,color:C.bg,fontSize:12,letterSpacing:3,textTransform:"uppercase",fontFamily:F.body,fontWeight:500,cursor:"pointer"}}>{t.registerInterest}</div>
          <div style={{fontSize:12,fontFamily:F.body,fontWeight:200,color:C.textFaint,marginTop:12}}>{t.registerInterestDesc}</div></>
        )}
        {interestOpen&&!submitted&&(
          <div style={{maxWidth:500,margin:"0 auto",textAlign:"left"}}>
            <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300,marginBottom:20,textAlign:"center"}}>{t.registerInterest}</div>
            {[[t.name,"name","text"],[t.email,"email","email"],[t.phone,"phone","tel"]].map(([l,k,tp])=>(
              <div key={k} style={{marginBottom:14}}>
                <div style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:C.textDim,fontFamily:F.body,fontWeight:300,marginBottom:4}}>{l} *</div>
                <input type={tp} style={iS} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} />
              </div>
            ))}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:C.textDim,fontFamily:F.body,fontWeight:300,marginBottom:4}}>{t.intendedUse}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {[["primaryResidence",t.primaryResidence],["vacationHome",t.vacationHome],["investment",t.investment],["rental",t.rentalUse]].map(([v,l])=>(
                  <span key={v} onClick={()=>setForm(f=>({...f,use:v}))} style={{padding:"6px 16px",border:`1px solid ${form.use===v?C.gold:C.border}`,fontSize:12,fontFamily:F.body,fontWeight:300,color:form.use===v?C.gold:C.textDim,cursor:"pointer"}}>{l}</span>
                ))}
              </div>
            </div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:C.textDim,fontFamily:F.body,fontWeight:300,marginBottom:4}}>{t.message}</div>
              <textarea style={{...iS,minHeight:70,resize:"vertical"}} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder={t.messagePlaceholder} />
            </div>
            <label style={{display:"flex",gap:10,alignItems:"center",marginBottom:20,cursor:"pointer"}}>
              <input type="checkbox" checked={form.consent} onChange={e=>setForm(f=>({...f,consent:e.target.checked}))} />
              <span style={{fontSize:12,fontFamily:F.body,fontWeight:300,color:C.textDim}}>{t.privacyConsent} *</span>
            </label>
            <div style={{display:"flex",gap:12,justifyContent:"center"}}>
              <div onClick={()=>setInterestOpen(false)} style={{padding:"12px 32px",border:`1px solid ${C.border}`,fontSize:12,fontFamily:F.body,fontWeight:300,color:C.textDim,cursor:"pointer"}}>{t.cancel}</div>
              <div onClick={handleSubmit} style={{padding:"12px 40px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,color:C.bg,fontSize:12,letterSpacing:2,textTransform:"uppercase",fontFamily:F.body,fontWeight:500,cursor:"pointer",opacity:(form.name&&form.email&&form.consent)?1:0.4}}>{t.submit}</div>
            </div>
          </div>
        )}
        {submitted&&(<div><div style={{fontSize:28,marginBottom:12}}>✓</div><div style={{fontSize:20,fontFamily:F.accent,fontWeight:500,color:C.gold,marginBottom:8}}>{t.thankYou}</div><div style={{fontSize:14,fontFamily:F.body,fontWeight:300,color:C.textDim}}>{t.thankYouDesc}</div></div>)}
      </div>
    </div>
  );
}

// ─── Property Editor ───
function PropertyEditor({ property, onChange, t, lang }) {
  const p = property;
  const set = (k, v) => onChange({ ...p, [k]: v });
  const [tab, setTab] = useState("basic");
  const isRental = p.type === "rental";
  const isDev = p.type === "development";
  const isBuilding = p.type === "building";

  const tabs = [
    ["basic", t.basicInfo],
    ["media", t.media],
    ["details", t.details],
    ...(isDev ? [["dev", t.devInfo], ["units", t.units]] : []),
    ...(isBuilding ? [["building", t.buildingInfo], ["units", t.units]] : []),
    ...(isRental ? [["rental", t.rentalInfo]] : []),
    ["map", t.mapTab],
    ["ai", t.aiTools],
  ].filter(([k]) => k);

  return (<div>
    {/* Type selector */}
    <div style={{marginBottom:24}}>
      <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300,marginBottom:10}}>{t.propertyType}</div>
      <div style={{display:"flex",gap:10}}>
        {[["development",t.development],["resale",t.resale],["building",t.building],["rental",t.rental]].map(([v,l])=>(
          <div key={v} onClick={()=>set("type",v)} style={{padding:"10px 24px",border:`1px solid ${p.type===v?C.gold:C.border}`,borderRadius:6,fontSize:13,fontFamily:F.body,fontWeight:p.type===v?500:300,color:p.type===v?C.gold:C.textDim,cursor:"pointer",background:p.type===v?"rgba(196,164,112,0.08)":"transparent"}}>{l}</div>
        ))}
      </div>
    </div>

    {/* Tabs */}
    <div style={{display:"flex",gap:4,marginBottom:24,borderBottom:`1px solid ${C.border}`,flexWrap:"wrap"}}>
      {tabs.map(([k,l])=>(
        <div key={k} onClick={()=>setTab(k)} style={{padding:"10px 18px",fontSize:12,fontFamily:F.body,fontWeight:tab===k?500:300,color:tab===k?C.gold:C.textDim,cursor:"pointer",borderBottom:tab===k?`2px solid ${C.gold}`:"2px solid transparent",letterSpacing:0.5}}>{l}</div>
      ))}
    </div>

    {tab==="basic"&&(<div>
      <TriField label={t.propertyName} value={p.name} onChange={v=>set("name",v)} placeholder={t.propertyNamePlaceholder} />
      {!isRental && <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16}}>
        <Field label={t.price}><input style={iS} type="number" value={p.price} onChange={e=>set("price",e.target.value)} placeholder={t.pricePlaceholder} /></Field>
        <Field label={t.currency}><select style={selS} value={p.currency} onChange={e=>set("currency",e.target.value)}>{Object.entries(CURRENCIES).map(([k,v])=><option key={k} value={k}>{k} ({v})</option>)}</select></Field>
      </div>}
      <TriField label={t.location} value={p.location} onChange={v=>set("location",v)} placeholder={t.locationPlaceholder} />
      <TriField label={t.description} value={p.description} onChange={v=>set("description",v)} placeholder={t.descriptionPlaceholder} textarea />
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Field label={t.landArea}><input style={iS} type="number" value={p.landArea} onChange={e=>set("landArea",e.target.value)} />{p.landArea&&<div style={{fontSize:11,color:C.textFaint,fontFamily:F.body,fontWeight:200,marginTop:4}}>= {sqmToTsubo(p.landArea)} {t.tsubo}</div>}</Field>
        <Field label={t.buildingArea}><input style={iS} type="number" value={p.buildingArea} onChange={e=>set("buildingArea",e.target.value)} />{p.buildingArea&&<div style={{fontSize:11,color:C.textFaint,fontFamily:F.body,fontWeight:200,marginTop:4}}>= {sqmToTsubo(p.buildingArea)} {t.tsubo}</div>}</Field>
      </div>
      {isBuilding && (
        <Field label={t.buildingCategory}>
          <div style={{display:"flex",gap:8}}>
            {[["residential",t.catResidential],["retail",t.catRetail],["office",t.catOffice],["mixed",t.catMixed]].map(([v,l])=>(
              <div key={v} onClick={()=>set("buildingCategory",v)} style={{padding:"8px 20px",border:`1px solid ${p.buildingCategory===v?C.gold:C.border}`,borderRadius:4,fontSize:12,fontFamily:F.body,fontWeight:p.buildingCategory===v?500:300,color:p.buildingCategory===v?C.gold:C.textDim,cursor:"pointer",background:p.buildingCategory===v?"rgba(196,164,112,0.08)":"transparent"}}>{l}</div>
            ))}
          </div>
        </Field>
      )}
      {!isBuilding && <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Field label={t.bedrooms}><input style={iS} type="number" value={p.bedrooms} onChange={e=>set("bedrooms",e.target.value)} /></Field>
        <Field label={t.bathrooms}><input style={iS} type="number" value={p.bathrooms} onChange={e=>set("bathrooms",e.target.value)} /></Field>
      </div>}
      {isBuilding && <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Field label={t.totalFloors}><input style={iS} type="number" value={p.totalFloors} onChange={e=>set("totalFloors",e.target.value)} /></Field>
        <Field label={t.totalBuildingUnits}><input style={iS} type="number" value={p.bedrooms} onChange={e=>set("bedrooms",e.target.value)} placeholder={lang==="ja"?"総区画数":"Total units"} /></Field>
      </div>}
      <Field label={t.features}><input style={iS} value={p.features} onChange={e=>set("features",e.target.value)} placeholder={t.featuresPlaceholder} /></Field>
      <Field label={t.passwordProtection}><input style={iS} type="text" value={p.password||""} onChange={e=>set("password",e.target.value)} placeholder={t.passwordPlaceholder} /></Field>
    </div>)}

    {tab==="media"&&(<div style={{display:"flex",flexDirection:"column",gap:20}}>
      <ImageUpload images={p.heroImages||[]} onChange={v=>set("heroImages",v)} label={t.heroImages} />
      <ImageUpload images={p.galleryImages||[]} onChange={v=>set("galleryImages",v)} label={t.galleryImages} />
      <ImageUpload images={p.floorPlan||[]} onChange={v=>set("floorPlan",v)} label={t.floorPlan} />
    </div>)}

    {tab==="details"&&(<div>
      <Field label={t.structure}><select style={selS} value={p.structure} onChange={e=>set("structure",e.target.value)}><option value="">—</option>{STRUCTURES.map(s=><option key={s} value={s}>{s}</option>)}</select></Field>
      <Field label={t.zoning}><select style={selS} value={p.zoning} onChange={e=>set("zoning",e.target.value)}><option value="">—</option>{ZONINGS.map(z=><option key={z} value={z}>{z}</option>)}</select></Field>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Field label={t.coverageRatio}><input style={iS} type="number" value={p.coverageRatio} onChange={e=>set("coverageRatio",e.target.value)} /></Field>
        <Field label={t.floorAreaRatio}><input style={iS} type="number" value={p.floorAreaRatio} onChange={e=>set("floorAreaRatio",e.target.value)} /></Field>
      </div>
      <Field label={t.currentStatus}><select style={selS} value={p.currentStatus} onChange={e=>set("currentStatus",e.target.value)}><option value="">—</option>{STATUSES_PROP.map(s=><option key={s} value={s}>{s}</option>)}</select></Field>
      <div style={{marginTop:8,padding:"20px 0",borderTop:`1px solid ${C.borderFaint}`}}>
        <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300,marginBottom:16}}>{t.accessTitle}</div>
        <TriField label={t.nearestStation} value={p.nearestStation||{en:"",ja:"",zh:""}} onChange={v=>set("nearestStation",v)} placeholder={t.nearestStationPlaceholder} />
        <TriField label={t.nearestAttraction} value={p.nearestAttraction||{en:"",ja:"",zh:""}} onChange={v=>set("nearestAttraction",v)} placeholder={t.nearestAttractionPlaceholder} />
        <TriField label={t.airportAccess} value={p.airportAccess||{en:"",ja:"",zh:""}} onChange={v=>set("airportAccess",v)} placeholder={t.airportAccessPlaceholder} />
      </div>
      <div style={{marginTop:8,padding:"20px 0",borderTop:`1px solid ${C.borderFaint}`}}>
        <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300,marginBottom:16}}>{t.contactAgent}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Field label={t.agentName}><input style={iS} value={p.agentName} onChange={e=>set("agentName",e.target.value)} /></Field>
          <Field label={t.agentContact}><input style={iS} value={p.agentContact} onChange={e=>set("agentContact",e.target.value)} /></Field>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Field label={t.companyName}><input style={iS} value={p.companyName} onChange={e=>set("companyName",e.target.value)} /></Field>
          <Field label={t.licenseNo}><input style={iS} value={p.licenseNo} onChange={e=>set("licenseNo",e.target.value)} /></Field>
        </div>
      </div>
    </div>)}

    {tab==="dev"&&isDev&&(<div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
        <Field label={t.developer}><input style={iS} value={p.developer} onChange={e=>set("developer",e.target.value)} /></Field>
        <Field label={t.constructionCo}><input style={iS} value={p.constructionCo} onChange={e=>set("constructionCo",e.target.value)} /></Field>
        <Field label={t.architect}><input style={iS} value={p.architect} onChange={e=>set("architect",e.target.value)} /></Field>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
        <Field label={t.constructionStart}><input style={iS} type="date" value={p.constructionStart} onChange={e=>set("constructionStart",e.target.value)} /></Field>
        <Field label={t.completionDate}><input style={iS} type="date" value={p.completionDate} onChange={e=>set("completionDate",e.target.value)} /></Field>
        <Field label={t.deliveryDate}><input style={iS} type="date" value={p.deliveryDate} onChange={e=>set("deliveryDate",e.target.value)} /></Field>
      </div>
      <div style={{marginTop:8,padding:"20px 0",borderTop:`1px solid ${C.borderFaint}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300}}>{t.timeline}</div>
          <div onClick={()=>set("timeline",[...(p.timeline||[]),{name:"",start:"",end:"",progress:0}])} style={{fontSize:11,fontFamily:F.body,fontWeight:400,color:C.gold,cursor:"pointer"}}>+ {t.addPhase}</div>
        </div>
        {(p.timeline||[]).map((phase,i)=>(
          <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 80px 30px",gap:8,marginBottom:8,alignItems:"end"}}>
            <Field label={i===0?t.phaseName:""}><input style={iS} value={phase.name} onChange={e=>{const tl=[...p.timeline];tl[i]={...tl[i],name:e.target.value};set("timeline",tl);}} /></Field>
            <Field label={i===0?t.phaseStart:""}><input style={iS} value={phase.start} onChange={e=>{const tl=[...p.timeline];tl[i]={...tl[i],start:e.target.value};set("timeline",tl);}} placeholder="2025 Q1" /></Field>
            <Field label={i===0?t.phaseEnd:""}><input style={iS} value={phase.end} onChange={e=>{const tl=[...p.timeline];tl[i]={...tl[i],end:e.target.value};set("timeline",tl);}} placeholder="2025 Q2" /></Field>
            <Field label={i===0?"%":""}><input style={{...iS,textAlign:"center"}} type="number" min="0" max="100" value={phase.progress} onChange={e=>{const tl=[...p.timeline];tl[i]={...tl[i],progress:parseInt(e.target.value)||0};set("timeline",tl);}} /></Field>
            <div onClick={()=>set("timeline",p.timeline.filter((_,j)=>j!==i))} style={{width:28,height:38,display:"flex",alignItems:"center",justifyContent:"center",color:C.danger,cursor:"pointer",fontSize:16,marginBottom:16}}>×</div>
          </div>
        ))}
      </div>
    </div>)}

    {tab==="units"&&(isDev||isBuilding)&&<UnitsEditor units={p.units||[]} onChange={v=>set("units",v)} t={t} />}

    {tab==="building"&&isBuilding&&(<div>
      {/* Floor breakdown editor */}
      <div style={{marginBottom:24}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300}}>{t.floorBreakdown}</div>
          <div onClick={()=>set("floors",[...(p.floors||[]),{label:`${(p.floors||[]).length+1}F`,usage:p.buildingCategory==="office"?"Office":p.buildingCategory==="retail"?"Retail":"Residential",units:[{name:"",area:"",usage:""}]}])} style={{fontSize:11,fontFamily:F.body,fontWeight:400,color:C.gold,cursor:"pointer"}}>+ {t.addFloor}</div>
        </div>
        {(p.floors||[]).map((fl,fi)=>{
          const floorArea = (fl.units||[]).reduce((s,u) => s + (parseFloat(u.area)||0), 0);
          const updFloor = (k,v) => { const f=[...p.floors]; f[fi]={...f[fi],[k]:v}; set("floors",f); };
          const updUnit = (ui,k,v) => { const f=[...p.floors]; const u=[...(f[fi].units||[])]; u[ui]={...u[ui],[k]:v}; f[fi]={...f[fi],units:u}; set("floors",f); };
          const addUnit = () => { const f=[...p.floors]; f[fi]={...f[fi],units:[...(f[fi].units||[]),{name:"",area:"",usage:fl.usage}]}; set("floors",f); };
          const delUnit = (ui) => { const f=[...p.floors]; f[fi]={...f[fi],units:(f[fi].units||[]).filter((_,j)=>j!==ui)}; set("floors",f); };
          return (
            <div key={fi} style={{marginBottom:16,padding:16,background:"rgba(196,164,112,0.03)",border:`1px solid ${C.borderFaint}`,borderRadius:8}}>
              {/* Floor header */}
              <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:12}}>
                <input style={{...iS,padding:"6px 10px",fontSize:13,fontWeight:500,width:70,textAlign:"center",background:"rgba(196,164,112,0.08)",borderColor:C.gold+"40"}} value={fl.label} onChange={e=>updFloor("label",e.target.value)} placeholder="1F" />
                <select style={{...selS,padding:"6px 10px",fontSize:12,flex:1}} value={fl.usage} onChange={e=>updFloor("usage",e.target.value)}>
                  <option value="Residential">{t.catResidential}</option>
                  <option value="Retail">{t.catRetail}</option>
                  <option value="Office">{t.catOffice}</option>
                  <option value="Parking">Parking</option>
                  <option value="Storage">Storage</option>
                  <option value="Common">Common Area</option>
                </select>
                <div style={{fontSize:12,fontFamily:F.accent,fontWeight:600,color:C.gold,whiteSpace:"nowrap"}}>{floorArea.toLocaleString()} ㎡</div>
                <div style={{fontSize:10,fontFamily:F.body,fontWeight:200,color:C.textFaint,whiteSpace:"nowrap"}}>({(floorArea*SQM_TO_TSUBO).toFixed(1)} tsubo)</div>
                <div onClick={()=>set("floors",p.floors.filter((_,j)=>j!==fi))} style={{color:C.danger,cursor:"pointer",fontSize:14,padding:"0 4px"}}>×</div>
              </div>
              {/* Units within floor */}
              {(fl.units||[]).length > 0 && (
                <div style={{marginLeft:16}}>
                  {fi===0 || true ? (
                    <div style={{display:"grid",gridTemplateColumns:"100px 1fr 1fr 24px",gap:6,marginBottom:6}}>
                      <div style={{fontSize:8,letterSpacing:1.5,textTransform:"uppercase",color:C.textFaint,fontFamily:F.body,fontWeight:300}}>{lang==="ja"?"号室":"Unit"}</div>
                      <div style={{fontSize:8,letterSpacing:1.5,textTransform:"uppercase",color:C.textFaint,fontFamily:F.body,fontWeight:300}}>{lang==="ja"?"面積 (㎡)":"Area (㎡)"}</div>
                      <div style={{fontSize:8,letterSpacing:1.5,textTransform:"uppercase",color:C.textFaint,fontFamily:F.body,fontWeight:300}}>{lang==="ja"?"用途":"Usage"}</div>
                      <div></div>
                    </div>
                  ) : null}
                  {(fl.units||[]).map((u,ui)=>(
                    <div key={ui} style={{display:"grid",gridTemplateColumns:"100px 1fr 1fr 24px",gap:6,marginBottom:4}}>
                      <input style={{...iS,padding:"5px 8px",fontSize:11}} value={u.name} onChange={e=>updUnit(ui,"name",e.target.value)} placeholder={`${fl.label}-${ui+1}`} />
                      <div>
                        <input style={{...iS,padding:"5px 8px",fontSize:11}} type="number" value={u.area} onChange={e=>updUnit(ui,"area",e.target.value)} placeholder="㎡" />
                        {u.area && <div style={{fontSize:9,color:C.textFaint,fontFamily:F.body,fontWeight:200,marginTop:1}}>= {sqmToTsubo(u.area)} tsubo</div>}
                      </div>
                      <select style={{...selS,padding:"5px 8px",fontSize:11}} value={u.usage||fl.usage} onChange={e=>updUnit(ui,"usage",e.target.value)}>
                        <option value="Residential">{t.catResidential}</option>
                        <option value="Retail">{t.catRetail}</option>
                        <option value="Office">{t.catOffice}</option>
                        <option value="Parking">Parking</option>
                        <option value="Storage">Storage</option>
                        <option value="Common">Common</option>
                      </select>
                      <div onClick={()=>delUnit(ui)} style={{display:"flex",alignItems:"center",justifyContent:"center",color:C.danger,cursor:"pointer",fontSize:12,opacity:0.6}}>×</div>
                    </div>
                  ))}
                </div>
              )}
              <div onClick={addUnit} style={{marginLeft:16,marginTop:8,fontSize:10,fontFamily:F.body,fontWeight:400,color:C.gold,cursor:"pointer",opacity:0.8}}>+ {lang==="ja"?"区画追加":"Add Unit"}</div>
            </div>
          );
        })}
        {/* Grand totals */}
        {(p.floors||[]).length > 0 && (() => {
          const totalArea = (p.floors||[]).reduce((s,f) => s + (f.units||[]).reduce((s2,u) => s2 + (parseFloat(u.area)||0), 0), 0);
          const totalUnits = (p.floors||[]).reduce((s,f) => s + (f.units||[]).length, 0);
          return (<div style={{marginTop:12,padding:"12px 16px",background:"rgba(196,164,112,0.05)",borderRadius:6,display:"flex",gap:32}}>
            <div><span style={{fontSize:10,color:C.textFaint,fontFamily:F.body,fontWeight:300}}>{t.grossFloorArea}: </span><span style={{fontSize:13,fontFamily:F.accent,fontWeight:600,color:C.gold}}>{totalArea.toLocaleString()} ㎡ ({(totalArea*SQM_TO_TSUBO).toFixed(1)} tsubo)</span></div>
            <div><span style={{fontSize:10,color:C.textFaint,fontFamily:F.body,fontWeight:300}}>{t.totalBuildingUnits}: </span><span style={{fontSize:13,fontFamily:F.accent,fontWeight:600,color:C.gold}}>{totalUnits}</span></div>
          </div>);
        })()}
      </div>

      {/* Investment metrics */}
      <div style={{padding:"20px 0",borderTop:`1px solid ${C.borderFaint}`}}>
        <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300,marginBottom:16}}>{lang==="ja"?"投資指標":lang==="zh"?"投資指標":"Investment Metrics"}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Field label={t.netLeasableArea}><input style={iS} type="number" value={p.netLeasableArea} onChange={e=>set("netLeasableArea",e.target.value)} /></Field>
          <Field label={t.occupancyRate}><input style={iS} type="number" value={p.occupancyRate} onChange={e=>set("occupancyRate",e.target.value)} /></Field>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Field label={t.annualIncome}><input style={iS} type="number" value={p.annualIncome} onChange={e=>set("annualIncome",e.target.value)} placeholder={t.annualIncomePlaceholder} />{p.annualIncome&&<div style={{fontSize:11,color:C.textFaint,fontFamily:F.body,fontWeight:200,marginTop:4}}>= ¥{parseInt(p.annualIncome).toLocaleString()}</div>}</Field>
          <Field label={t.noi}><input style={iS} type="number" value={p.noi} onChange={e=>set("noi",e.target.value)} placeholder={t.noiPlaceholder} />{p.noi&&<div style={{fontSize:11,color:C.textFaint,fontFamily:F.body,fontWeight:200,marginTop:4}}>= ¥{parseInt(p.noi).toLocaleString()}</div>}</Field>
        </div>
        <Field label={t.capRate}><input style={iS} type="number" step="0.1" value={p.capRate} onChange={e=>set("capRate",e.target.value)} />{p.capRate&&p.price&&<div style={{fontSize:11,color:C.textFaint,fontFamily:F.body,fontWeight:200,marginTop:4}}>Implied NOI @ {p.capRate}%: ¥{Math.round(parseInt(p.price)*(parseFloat(p.capRate)/100)).toLocaleString()}</div>}</Field>
      </div>
    </div>)}

    {tab==="rental"&&isRental&&(<div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Field label={t.monthlyRent}><input style={iS} type="number" value={p.monthlyRent} onChange={e=>set("monthlyRent",e.target.value)} placeholder={t.monthlyRentPlaceholder} />{p.monthlyRent&&<div style={{fontSize:11,color:C.textFaint,fontFamily:F.body,fontWeight:200,marginTop:4}}>= ¥{parseInt(p.monthlyRent).toLocaleString()} / month</div>}</Field>
        <Field label={t.managementFee}><input style={iS} type="number" value={p.managementFee} onChange={e=>set("managementFee",e.target.value)} placeholder={t.managementFeePlaceholder} /></Field>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Field label={t.deposit}><input style={iS} value={p.deposit} onChange={e=>set("deposit",e.target.value)} placeholder={t.depositPlaceholder} /></Field>
        <Field label={t.keyMoney}><input style={iS} value={p.keyMoney} onChange={e=>set("keyMoney",e.target.value)} placeholder={t.keyMoneyPlaceholder} /></Field>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Field label={t.leaseTerm}><input style={iS} value={p.leaseTerm} onChange={e=>set("leaseTerm",e.target.value)} placeholder={t.leaseTermPlaceholder} /></Field>
        <Field label={t.availableFrom}><input style={iS} type="date" value={p.availableFrom} onChange={e=>set("availableFrom",e.target.value)} /></Field>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
        <Field label={t.petPolicy}><select style={selS} value={p.petPolicy} onChange={e=>set("petPolicy",e.target.value)}><option value="">—</option><option value={t.yes}>{t.yes}</option><option value={t.no}>{t.no}</option><option value={t.negotiable}>{t.negotiable}</option></select></Field>
        <Field label={t.parkingIncluded}><select style={selS} value={p.parkingIncluded} onChange={e=>set("parkingIncluded",e.target.value)}><option value="">—</option><option value={t.yes}>{t.yes}</option><option value={t.no}>{t.no}</option></select></Field>
        <Field label={t.furnished}><select style={selS} value={p.furnished} onChange={e=>set("furnished",e.target.value)}><option value="">—</option><option value={t.yes}>{t.yes}</option><option value={t.no}>{t.no}</option></select></Field>
      </div>
    </div>)}

    {tab==="map"&&<MapEditor property={p} onChange={onChange} t={t} lang={lang} />}

    {tab==="ai"&&<AITools property={p} onChange={onChange} t={t} lang={lang} />}
  </div>);
}

// ─── Inquiries View ───
function InquiriesView({ inquiries, onUpdate, t }) {
  const sCol = {new:C.gold,contacted:C.success,followUp:"#c49a40",converted:C.blue};
  const sLbl = {new:t.new,contacted:t.contacted,followUp:t.followUp,converted:t.converted};
  if(!inquiries.length) return <div style={{textAlign:"center",padding:"60px 20px"}}><div style={{fontSize:32,opacity:0.2,marginBottom:12}}>📋</div><div style={{fontSize:16,fontFamily:F.accent,color:C.textDim}}>{t.noInquiries}</div></div>;
  return (<div>
    <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gold,fontFamily:F.body,fontWeight:300,marginBottom:20}}>{t.allInquiries} ({inquiries.length})</div>
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {inquiries.map((inq,i)=>(<div key={i} style={{padding:"18px 22px",background:C.bgCard,borderRadius:8,border:`1px solid ${C.borderFaint}`,display:"grid",gridTemplateColumns:"1fr 1fr auto",gap:16,alignItems:"center"}}>
        <div><div style={{fontSize:15,fontFamily:F.body,fontWeight:500,color:C.text,marginBottom:2}}>{inq.name}</div><div style={{fontSize:12,fontFamily:F.body,fontWeight:300,color:C.textDim}}>{inq.email}{inq.phone?` · ${inq.phone}`:""}</div>{inq.message&&<div style={{fontSize:12,fontFamily:F.body,fontWeight:200,color:C.textFaint,marginTop:6,fontStyle:"italic"}}>"{inq.message}"</div>}</div>
        <div><div style={{fontSize:12,fontFamily:F.body,fontWeight:300,color:C.textDim}}>{inq.propertyName}</div><div style={{fontSize:11,fontFamily:F.body,fontWeight:200,color:C.textFaint}}>{new Date(inq.date).toLocaleDateString()}</div></div>
        <select value={inq.status||"new"} onChange={e=>onUpdate(i,e.target.value)} style={{...selS,width:130,fontSize:11,padding:"6px 10px",color:sCol[inq.status||"new"],borderColor:sCol[inq.status||"new"]}}>
          {Object.entries(sLbl).map(([k,v])=><option key={k} value={k}>{v}</option>)}
        </select>
      </div>))}
    </div>
  </div>);
}

// ─── Main App ───
export default function App() {
  const [lang, setLang] = useState("en");
  const [screen, setScreen] = useState("dashboard");
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [editing, setEditing] = useState(null);
  const [previewing, setPreviewing] = useState(null);
  const [previewLang, setPreviewLang] = useState("en");
  const [pwUnlocked, setPwUnlocked] = useState({});
  const [loaded, setLoaded] = useState(false);
  const t = T[lang]||T.en;

  useEffect(()=>{(async()=>{
    try{const r=await window.storage.get("rep_props");if(r?.value)setProperties(JSON.parse(r.value));}catch{}
    try{const r=await window.storage.get("rep_inqs");if(r?.value)setInquiries(JSON.parse(r.value));}catch{}
    setLoaded(true);
  })();},[]);

  useEffect(()=>{if(!loaded)return;window.storage.set("rep_props",JSON.stringify(properties)).catch(()=>{});},[properties,loaded]);
  useEffect(()=>{if(!loaded)return;window.storage.set("rep_inqs",JSON.stringify(inquiries)).catch(()=>{});},[inquiries,loaded]);

  const saveProperty = () => {
    const idx = properties.findIndex(p=>p.id===editing.id);
    if(idx>=0){const u=[...properties];u[idx]=editing;setProperties(u);}
    else setProperties([...properties,editing]);
    setScreen("dashboard"); setEditing(null);
  };

  const recordView = (propId) => {
    const session = `s_${Date.now()}`;
    setProperties(prev => prev.map(p => p.id === propId ? { ...p, views: [...(p.views||[]), { time: new Date().toISOString(), session }] } : p));
  };

  const handlePreview = (p) => {
    if (p.password && !pwUnlocked[p.id]) {
      setPreviewing({ ...p, needsPassword: true });
    } else {
      recordView(p.id);
      setPreviewing(p);
    }
    setPreviewLang(lang);
    setScreen("preview");
  };

  const handleUnlock = (pw) => {
    if (pw === previewing.password) {
      setPwUnlocked(prev => ({ ...prev, [previewing.id]: true }));
      recordView(previewing.id);
      setPreviewing({ ...previewing, needsPassword: false });
      return true;
    }
    return false;
  };

  // Preview screen
  if (screen === "preview" && previewing) {
    if (previewing.needsPassword) {
      return (<div><style>{FONT_IMPORT}</style><PasswordGate onUnlock={handleUnlock} t={t} /></div>);
    }
    return (
      <div style={{height:"100vh",display:"flex",flexDirection:"column",background:C.bg}}>
        <style>{FONT_IMPORT}{`@media print{.no-print{display:none!important}body{background:#0a0a0a!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}}`}</style>
        <div className="no-print" style={{padding:"10px 24px",background:C.bgLight,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:16,flexShrink:0}}>
          <div onClick={()=>{setScreen("dashboard");setPreviewing(null);}} style={{fontSize:12,fontFamily:F.body,fontWeight:400,color:C.gold,cursor:"pointer"}}>← {t.back}</div>
          <div style={{flex:1}} />
          <div style={{display:"flex",gap:6}}>
            {[["en","EN"],["ja","日本語"],["zh","中文"]].map(([k,l])=>(
              <div key={k} onClick={()=>setPreviewLang(k)} style={{padding:"5px 14px",fontSize:11,fontFamily:F.body,fontWeight:previewLang===k?500:300,color:previewLang===k?C.bg:C.textDim,background:previewLang===k?C.gold:"transparent",border:`1px solid ${previewLang===k?C.gold:C.border}`,borderRadius:4,cursor:"pointer"}}>{l}</div>
            ))}
          </div>
          <div style={{width:1,height:24,background:C.border,margin:"0 4px"}} />
          <div onClick={()=>{
            const el = document.querySelector('[data-presentation]');
            if (!el) return;
            const title = getLangVal(previewing.name, previewLang) || 'Property';
            const w = window.open('','_blank');
            if (!w) { alert('Popup blocked. Please allow popups for this site, or use Ctrl+P to print.'); return; }
            w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500;600&family=Outfit:wght@200;300;400;500;600&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0d0b08}@page{size:A4;margin:0}@media print{body{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;color-adjust:exact!important}}</style></head><body>${el.outerHTML}</body></html>`);
            w.document.close();
            setTimeout(()=>{w.print();},800);
          }} style={{padding:"5px 18px",fontSize:11,fontFamily:F.body,fontWeight:400,color:C.text,border:`1px solid ${C.border}`,borderRadius:4,cursor:"pointer"}}>{t.exportPdf}</div>
        </div>
        <div style={{flex:1,overflow:"auto"}}>
          <PresentationView property={previewing} lang={previewLang} onInterest={inq=>setInquiries(prev=>[{...inq,status:"new"},...prev])} />
        </div>
      </div>
    );
  }

  // Main layout
  return (
    <div style={{height:"100vh",display:"flex",fontFamily:F.body,background:C.bg,color:C.text}}>
      <style>{FONT_IMPORT}</style>

      {/* Sidebar */}
      <div style={{width:220,flexShrink:0,background:C.bgLight,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",padding:"24px 0"}}>
        <div style={{padding:"0 24px 24px",borderBottom:`1px solid ${C.borderFaint}`}}>
          <CMPLogo width={120} style={{display:"block",marginBottom:2}} />
        </div>
        <div style={{padding:"16px 12px",flex:1}}>
          {[["dashboard",t.dashboard,"▦"],["inquiries",t.inquiries,"◈"],["analytics",t.analytics,"◎"]].map(([s,l,icon])=>(
            <div key={s} onClick={()=>{setScreen(s);setEditing(null);}} style={{padding:"10px 12px",borderRadius:6,marginBottom:4,cursor:"pointer",background:screen===s?"rgba(196,164,112,0.1)":"transparent",color:screen===s?C.gold:C.textDim,fontSize:13,fontWeight:screen===s?500:300,display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:14,opacity:0.7}}>{icon}</span> {l}
              {s==="inquiries"&&inquiries.filter(i=>i.status==="new").length>0&&<span style={{marginLeft:"auto",background:C.gold,color:C.bg,fontSize:10,fontWeight:600,padding:"1px 7px",borderRadius:10}}>{inquiries.filter(i=>i.status==="new").length}</span>}
            </div>
          ))}
        </div>
        <div style={{padding:"16px 24px",borderTop:`1px solid ${C.borderFaint}`}}>
          <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:C.textFaint,marginBottom:8}}>Interface</div>
          <div style={{display:"flex",gap:4}}>
            {[["en","EN"],["ja","JP"],["zh","中"]].map(([k,l])=>(
              <div key={k} onClick={()=>setLang(k)} style={{flex:1,textAlign:"center",padding:"5px 0",fontSize:11,background:lang===k?C.gold:"transparent",color:lang===k?C.bg:C.textDim,border:`1px solid ${lang===k?C.gold:C.border}`,borderRadius:4,cursor:"pointer",fontWeight:lang===k?500:300}}>{l}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{flex:1,overflow:"auto",padding:"28px 36px"}}>
        {screen==="dashboard"&&(<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
            <h2 style={{fontSize:22,fontFamily:F.display,fontWeight:600,color:C.white,margin:0}}>{t.dashboard}</h2>
            <div onClick={()=>{setEditing(emptyProperty());setScreen("editor");}} style={{padding:"10px 24px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,color:C.bg,fontSize:12,fontFamily:F.body,fontWeight:500,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",borderRadius:4}}>+ {t.newProperty}</div>
          </div>
          {properties.length===0?(<div style={{textAlign:"center",padding:"80px 20px"}}><CMPLogo width={100} fill={C.text} style={{display:"inline-block",opacity:0.15,marginBottom:16}} /><div style={{fontSize:18,fontFamily:F.accent,color:C.textDim,marginBottom:8}}>{t.noProperties}</div><div style={{fontSize:13,fontFamily:F.body,fontWeight:200,color:C.textFaint}}>{t.noPropertiesDesc}</div></div>)
          :(<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
            {properties.map(p=>{
              const nm=getLangVal(p.name,lang)||"Untitled";
              const loc=getLangVal(p.location,lang);
              const hero=p.heroImages?.[0]?.data;
              const isR=p.type==="rental";
              const isB=p.type==="building";
              const viewCount=(p.views||[]).length;
              const typeStr=isR?t.rental:isB?t.building:p.type==="development"?t.development:t.resale;
              return (<div key={p.id} style={{background:C.bgCard,borderRadius:10,overflow:"hidden",border:`1px solid ${C.borderFaint}`}}>
                <div style={{height:160,background:hero?`url(${hero}) center/cover`:`linear-gradient(135deg,${C.bgCard},${C.bgLight})`,position:"relative"}}>
                  {hero&&<div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(26,23,20,0.8),transparent)"}} />}
                  <div style={{position:"absolute",top:12,right:12,display:"flex",gap:6}}>
                    {p.password&&<span style={{padding:"3px 8px",background:"rgba(196,164,112,0.3)",borderRadius:3,fontSize:9,fontFamily:F.body,fontWeight:500,letterSpacing:1,color:"#fff"}}>🔒</span>}
                    <span style={{padding:"3px 10px",background:C.bgCard+"cc",borderRadius:3,fontSize:9,fontFamily:F.body,fontWeight:500,letterSpacing:1,textTransform:"uppercase",color:C.textDim}}>{typeStr}</span>
                  </div>
                  {viewCount>0&&<div style={{position:"absolute",top:12,left:12,padding:"3px 8px",background:"rgba(0,0,0,0.5)",borderRadius:3,fontSize:9,fontFamily:F.body,color:C.textDim}}>{viewCount} views</div>}
                  <div style={{position:"absolute",bottom:14,left:16,zIndex:2}}>
                    <div style={{fontSize:17,fontFamily:F.display,fontWeight:600,color:C.white}}>{nm}</div>
                    {loc&&<div style={{fontSize:11,fontFamily:F.body,fontWeight:200,color:C.textDim,marginTop:2}}>{loc}</div>}
                  </div>
                </div>
                <div style={{padding:"14px 16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:12}}>
                    <span style={{fontSize:18,fontFamily:F.accent,fontWeight:600,color:C.gold}}>{isR?`${fmtPrice(p.monthlyRent,"JPY")} /mo`:fmtPrice(p.price,p.currency)||"—"}</span>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <div onClick={()=>{setEditing({...p});setScreen("editor");}} style={{flex:1,padding:"7px 0",textAlign:"center",border:`1px solid ${C.border}`,borderRadius:4,fontSize:11,fontFamily:F.body,fontWeight:400,color:C.textDim,cursor:"pointer"}}>{t.editProperty}</div>
                    <div onClick={()=>handlePreview(p)} style={{flex:1,padding:"7px 0",textAlign:"center",background:"rgba(196,164,112,0.12)",border:`1px solid ${C.border}`,borderRadius:4,fontSize:11,fontFamily:F.body,fontWeight:500,color:C.gold,cursor:"pointer"}}>{t.preview}</div>
                    <div onClick={()=>setProperties(properties.filter(x=>x.id!==p.id))} style={{padding:"7px 12px",border:"1px solid rgba(196,64,64,0.3)",borderRadius:4,fontSize:11,color:C.danger,cursor:"pointer"}}>×</div>
                  </div>
                </div>
              </div>);
            })}
          </div>)}
        </div>)}

        {screen==="editor"&&editing&&(<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div onClick={()=>{setScreen("dashboard");setEditing(null);}} style={{fontSize:12,fontFamily:F.body,fontWeight:400,color:C.gold,cursor:"pointer"}}>← {t.back}</div>
              <h2 style={{fontSize:20,fontFamily:F.display,fontWeight:600,color:C.white,margin:0}}>{properties.find(p=>p.id===editing.id)?t.editProperty:t.newProperty}</h2>
            </div>
            <div style={{display:"flex",gap:10}}>
              <div onClick={()=>handlePreview(editing)} style={{padding:"9px 20px",border:`1px solid ${C.border}`,borderRadius:4,fontSize:12,fontFamily:F.body,fontWeight:400,color:C.textDim,cursor:"pointer"}}>{t.preview}</div>
              <div onClick={saveProperty} style={{padding:"9px 28px",background:`linear-gradient(135deg,${C.gold},${C.goldDark})`,color:C.bg,fontSize:12,fontFamily:F.body,fontWeight:500,letterSpacing:1,textTransform:"uppercase",cursor:"pointer",borderRadius:4}}>{t.save}</div>
            </div>
          </div>
          <div style={{maxWidth:760}}><PropertyEditor property={editing} onChange={setEditing} t={t} lang={lang} /></div>
        </div>)}

        {screen==="inquiries"&&(<div>
          <h2 style={{fontSize:22,fontFamily:F.display,fontWeight:600,color:C.white,margin:"0 0 24px"}}>{t.inquiries}</h2>
          <InquiriesView inquiries={inquiries} onUpdate={(i,s)=>{const u=[...inquiries];u[i]={...u[i],status:s};setInquiries(u);}} t={t} />
        </div>)}

        {screen==="analytics"&&(<div>
          <h2 style={{fontSize:22,fontFamily:F.display,fontWeight:600,color:C.white,margin:"0 0 24px"}}>{t.analytics}</h2>
          <AnalyticsView properties={properties} t={t} />
        </div>)}
      </div>
    </div>
  );
}
