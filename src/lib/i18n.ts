export const LOCALES = ["en", "vi"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export interface Dictionary {
  nav: {
    overview: string;
    categories: string;
    statistics: string;
    totalEips: string;
    final: string;
    draft: string;
    review: string;
    lastUpdated: string;
  };
  header: {
    searchPlaceholder: string;
    favorites: string;
    categories: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    totalEips: string;
    final: string;
    draft: string;
    contributors: string;
  };
  popular: {
    title: string;
    subtitle: string;
    viewAll: string;
  };
  right: {
    popularEips: string;
    viewRanking: string;
    statusTitle: string;
    legend: string;
    favorite: string;
    popular: string;
    finalized: string;
    inProgress: string;
    contributeTitle: string;
    contributeBody: string;
    contributeCta: string;
  };
  detail: {
    authors: string;
    created: string;
    status: string;
    type: string;
    category: string;
    requires: string;
    replaces: string;
    description: string;
    toc: string;
    related: string;
    references: string;
    specNote: string;
    machineNote: string;
    viewOnGithub: string;
    viewOfficial: string;
    copy: string;
    copied: string;
    devMode: string;
    beginnerMode: string;
    beginner: string;
    intermediate: string;
    advanced: string;
    learnTitle: string;
  };
  search: {
    title: string;
    placeholder: string;
    results: string;
    noResults: string;
    typeToSearch: string;
  };
  footer: {
    learn: string;
    learnBody: string;
    source: string;
    sourceBody: string;
    community: string;
    communityBody: string;
  };
  common: {
    backHome: string;
    eips: string;
    allCategories: string;
    showing: string;
  };
}

const en: Dictionary = {
  nav: {
    overview: "Overview",
    categories: "Categories",
    statistics: "Statistics",
    totalEips: "Total EIPs",
    final: "Final",
    draft: "Draft",
    review: "Review",
    lastUpdated: "Last Updated",
  },
  header: {
    searchPlaceholder: "Search EIP...",
    favorites: "Favorites",
    categories: "Categories",
  },
  hero: {
    badge: "Ethereum Improvement Proposals (EIPs)",
    title: "Ethereum Improvement Proposals",
    description:
      "EIPs are proposals to improve Ethereum — from token standards and smart contracts to protocol upgrades, tooling and beyond.",
    totalEips: "Total EIPs",
    final: "Final",
    draft: "In Progress",
    contributors: "Contributors",
  },
  popular: {
    title: "Most Popular Standards",
    subtitle: "The standards that power the Ethereum ecosystem.",
    viewAll: "View all",
  },
  right: {
    popularEips: "Popular EIPs",
    viewRanking: "View full ranking",
    statusTitle: "EIP Status",
    legend: "Legend",
    favorite: "Favorite",
    popular: "Popular",
    finalized: "Finalized (Final)",
    inProgress: "In progress (Draft)",
    contributeTitle: "Contribute to Ethereum",
    contributeBody:
      "You can propose a new EIP or join the discussion on GitHub.",
    contributeCta: "Join now",
  },
  detail: {
    authors: "Authors",
    created: "Created",
    status: "Status",
    type: "Type",
    category: "Category",
    requires: "Requires",
    replaces: "Replaces",
    description: "Description",
    toc: "On this page",
    related: "Related EIPs",
    references: "References",
    specNote: "The technical specification below is shown in its original English (the source of truth).",
    machineNote: "Automatically machine-translated — may be imperfect. See the original English on GitHub.",
    viewOnGithub: "View on GitHub",
    viewOfficial: "Official EIP",
    copy: "Copy",
    copied: "Copied",
    devMode: "Developer",
    beginnerMode: "Beginner",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    learnTitle: "Learn this standard",
  },
  search: {
    title: "Search",
    placeholder: "Search by number, title, keyword, author...",
    results: "results",
    noResults: "No results found",
    typeToSearch: "Start typing to search across all EIPs.",
  },
  footer: {
    learn: "Learn EIPs",
    learnBody: "Read detailed docs for every EIP",
    source: "View source",
    sourceBody: "Code, implementation & reference",
    community: "Join the community",
    communityBody: "Discuss & contribute ideas",
  },
  common: {
    backHome: "Back to overview",
    eips: "EIPs",
    allCategories: "All categories",
    showing: "Showing",
  },
};

const vi: Dictionary = {
  nav: {
    overview: "Tổng quan",
    categories: "Danh mục",
    statistics: "Thống kê",
    totalEips: "Tổng EIP",
    final: "Chuẩn hóa",
    draft: "Đang phát triển",
    review: "Đang xem xét",
    lastUpdated: "Cập nhật lần cuối",
  },
  header: {
    searchPlaceholder: "Tìm kiếm EIP...",
    favorites: "Yêu thích",
    categories: "Danh mục",
  },
  hero: {
    badge: "Ethereum Improvement Proposals (EIPs)",
    title: "Đề xuất cải tiến Ethereum",
    description:
      "EIP là các đề xuất cải tiến cho Ethereum, từ chuẩn token, smart contract đến giao thức, công cụ và hơn thế nữa.",
    totalEips: "Tổng EIP",
    final: "Chuẩn hóa",
    draft: "Đang phát triển",
    contributors: "Đóng góp viên",
  },
  popular: {
    title: "Các chuẩn phổ biến nhất",
    subtitle: "Những chuẩn vận hành cả hệ sinh thái Ethereum.",
    viewAll: "Xem tất cả",
  },
  right: {
    popularEips: "EIP phổ biến",
    viewRanking: "Xem tất cả bảng xếp hạng",
    statusTitle: "Trạng thái EIP",
    legend: "Ký hiệu",
    favorite: "Yêu thích",
    popular: "Phổ biến",
    finalized: "Chuẩn hóa (Final)",
    inProgress: "Đang phát triển (Draft)",
    contributeTitle: "Đóng góp cho Ethereum",
    contributeBody:
      "Bạn có thể đề xuất EIP mới hoặc tham gia thảo luận trên GitHub.",
    contributeCta: "Tham gia ngay",
  },
  detail: {
    authors: "Tác giả",
    created: "Ngày tạo",
    status: "Trạng thái",
    type: "Loại",
    category: "Danh mục",
    requires: "Yêu cầu",
    replaces: "Thay thế",
    description: "Mô tả",
    toc: "Mục lục",
    related: "EIP liên quan",
    references: "Tham khảo",
    specNote: "Phần đặc tả kỹ thuật bên dưới được giữ nguyên bản tiếng Anh gốc (nguồn chuẩn).",
    machineNote: "Bản dịch tự động bằng máy — có thể chưa hoàn hảo. Xem bản gốc tiếng Anh trên GitHub.",
    viewOnGithub: "Xem trên GitHub",
    viewOfficial: "EIP chính thức",
    copy: "Sao chép",
    copied: "Đã sao chép",
    devMode: "Lập trình viên",
    beginnerMode: "Người mới",
    beginner: "Cơ bản",
    intermediate: "Trung cấp",
    advanced: "Nâng cao",
    learnTitle: "Tìm hiểu chuẩn này",
  },
  search: {
    title: "Tìm kiếm",
    placeholder: "Tìm theo số, tiêu đề, từ khóa, tác giả...",
    results: "kết quả",
    noResults: "Không tìm thấy kết quả",
    typeToSearch: "Bắt đầu nhập để tìm kiếm trong tất cả EIP.",
  },
  footer: {
    learn: "Tìm hiểu EIP",
    learnBody: "Đọc tài liệu chi tiết về từng EIP",
    source: "Xem mã nguồn",
    sourceBody: "Code, implementation & reference",
    community: "Tham gia cộng đồng",
    communityBody: "Thảo luận & đóng góp ý tưởng",
  },
  common: {
    backHome: "Về tổng quan",
    eips: "EIP",
    allCategories: "Tất cả danh mục",
    showing: "Hiển thị",
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { en, vi };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? en;
}

// Localized values for EIP metadata fields ---------------------------------
const STATUS_LABELS: Record<Locale, Record<string, string>> = {
  en: {},
  vi: {
    Final: "Chuẩn hóa",
    Draft: "Đang phát triển",
    Review: "Đang xem xét",
    "Last Call": "Lần gọi cuối",
    Stagnant: "Đình trệ",
    Living: "Đang duy trì",
    Withdrawn: "Đã rút",
    Idea: "Ý tưởng",
    Moved: "Đã chuyển",
    Other: "Khác",
  },
};

const TYPE_LABELS: Record<Locale, Record<string, string>> = {
  en: {},
  vi: {
    "Standards Track": "Tiêu chuẩn (Standards Track)",
    Meta: "Meta",
    Informational: "Thông tin",
    Core: "Lõi (Core)",
    Networking: "Mạng (Networking)",
    Interface: "Giao diện (Interface)",
    ERC: "ERC",
  },
};

const CATEGORY_VALUE_LABELS: Record<Locale, Record<string, string>> = {
  en: {},
  vi: {
    Core: "Lõi (Core)",
    Networking: "Mạng (Networking)",
    Interface: "Giao diện (Interface)",
    ERC: "ERC",
  },
};

export function localizeStatus(status: string, locale: Locale): string {
  return STATUS_LABELS[locale]?.[status] ?? status;
}
export function localizeType(value: string | null | undefined, locale: Locale): string {
  if (!value) return "—";
  return TYPE_LABELS[locale]?.[value] ?? value;
}
export function localizeCategoryValue(value: string | null | undefined, locale: Locale): string {
  if (!value) return "—";
  return CATEGORY_VALUE_LABELS[locale]?.[value] ?? value;
}

// Translate the standard EIP section headings (## Abstract, ## Motivation, …)
// so a Vietnamese reader can navigate the document; technical prose stays as-is.
const SECTION_HEADINGS_VI: Record<string, string> = {
  Abstract: "Tóm tắt",
  "Simple Summary": "Tóm tắt đơn giản",
  Motivation: "Động lực",
  Specification: "Đặc tả kỹ thuật",
  Rationale: "Cơ sở lý luận",
  "Backwards Compatibility": "Tương thích ngược",
  "Forwards Compatibility": "Tương thích về sau",
  "Test Cases": "Trường hợp kiểm thử",
  "Reference Implementation": "Triển khai tham khảo",
  "Security Considerations": "Cân nhắc bảo mật",
  "Privacy Considerations": "Cân nhắc quyền riêng tư",
  Copyright: "Bản quyền",
  Definitions: "Định nghĩa",
  Parameters: "Tham số",
};

export function localizeBodyHeadings(body: string, locale: Locale): string {
  if (locale !== "vi") return body;
  return body.replace(/^(#{1,3})\s+(.+?)\s*#*$/gm, (line, hashes, title) => {
    const clean = title.trim();
    const vi = SECTION_HEADINGS_VI[clean];
    return vi ? `${hashes} ${vi}` : line;
  });
}

// Localized category labels (Vietnamese mirrors the screenshot sidebar).
export const CATEGORY_LABELS: Record<Locale, Record<string, string>> = {
  en: {
    token: "Token Standards",
    nft: "NFT Standards",
    wallet: "Wallet & Account",
    security: "Security & Upgrade",
    defi: "DeFi Standards",
    signature: "Signature & Permit",
    identity: "Identity & KYC",
    infrastructure: "Infrastructure",
    metadata: "UI/UX & Metadata",
    others: "Others",
  },
  vi: {
    token: "Token Standards",
    nft: "NFT Standards",
    wallet: "Wallet & Account",
    security: "Security & Upgrade",
    defi: "DeFi Standards",
    signature: "Signature & Permit",
    identity: "Identity & KYC",
    infrastructure: "Infrastructure",
    metadata: "UI/UX & Metadata",
    others: "Khác",
  },
};
