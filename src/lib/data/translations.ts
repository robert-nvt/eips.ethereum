export interface TranslationEntry {
  id: number;
  vi: {
    title: string;
    abstract: string;
    summary: string;
    description: string;
  };
  learning: {
    en: { beginner: string; intermediate: string; advanced: string };
    vi: { beginner: string; intermediate: string; advanced: string };
  };
}

export const TRANSLATIONS: TranslationEntry[] = [
  {
    id: 20,
    vi: {
      title: "Chuẩn Token Thay Thế (Fungible)",
      abstract:
        "ERC-20 định nghĩa một giao diện chuẩn cho token có thể thay thế (fungible) trên Ethereum, cho phép chuyển và uỷ quyền token một cách thống nhất.",
      summary:
        "Chuẩn token phổ biến nhất, là nền tảng cho hầu hết các đồng coin và stablecoin trên Ethereum.",
      description: "Giao diện chuẩn cho token có thể thay thế.",
    },
    learning: {
      en: {
        beginner:
          "ERC-20 is the rulebook that lets any token (like USDC or DAI) work the same way in every wallet and app. Send, receive, and approve spending — all standardized.",
        intermediate:
          "ERC-20 specifies functions like transfer, approve and allowance plus Transfer/Approval events, so exchanges and wallets can integrate any compliant token without custom code.",
        advanced:
          "The approve/transferFrom allowance model enables delegated transfers but introduces the well-known double-spend race; later standards (EIP-2612 permit) address gasless approvals via signatures.",
      },
      vi: {
        beginner:
          "ERC-20 là bộ quy tắc giúp mọi token (như USDC hay DAI) hoạt động giống nhau trong mọi ví và ứng dụng: gửi, nhận và cấp quyền chi tiêu đều được chuẩn hoá.",
        intermediate:
          "ERC-20 quy định các hàm như transfer, approve, allowance cùng sự kiện Transfer/Approval, nhờ đó sàn và ví có thể tích hợp bất kỳ token tuân thủ nào mà không cần code riêng.",
        advanced:
          "Mô hình allowance approve/transferFrom cho phép chuyển uỷ quyền nhưng tồn tại lỗ hổng race-condition; các chuẩn sau (EIP-2612 permit) bổ sung cấp quyền không tốn gas bằng chữ ký.",
      },
    },
  },
  {
    id: 721,
    vi: {
      title: "Chuẩn Token Không Thể Thay Thế (NFT)",
      abstract:
        "ERC-721 định nghĩa giao diện chuẩn cho token không thể thay thế (NFT), nơi mỗi token là duy nhất và có thể đại diện cho quyền sở hữu tài sản số hoặc vật lý.",
      summary: "Chuẩn NFT cho tài sản không thể thay thế như tác phẩm nghệ thuật, vật phẩm game.",
      description: "Giao diện chuẩn cho token không thể thay thế.",
    },
    learning: {
      en: {
        beginner: "ERC-721 makes each token unique — perfect for collectibles, art, and ownership records.",
        intermediate:
          "Each ERC-721 token has a distinct tokenId with its own owner; the standard defines ownerOf, safeTransferFrom and metadata extensions.",
        advanced:
          "ERC-721 relies on ERC-165 introspection and a safeTransfer receiver hook (onERC721Received) to prevent tokens being locked in non-aware contracts.",
      },
      vi: {
        beginner: "ERC-721 làm cho mỗi token là duy nhất — hoàn hảo cho vật phẩm sưu tầm, nghệ thuật và chứng nhận sở hữu.",
        intermediate:
          "Mỗi token ERC-721 có một tokenId riêng với chủ sở hữu riêng; chuẩn định nghĩa ownerOf, safeTransferFrom và phần mở rộng metadata.",
        advanced:
          "ERC-721 dựa vào cơ chế introspection ERC-165 và hook nhận safeTransfer (onERC721Received) để tránh token bị khoá trong các hợp đồng không hỗ trợ.",
      },
    },
  },
  {
    id: 1155,
    vi: {
      title: "Chuẩn Đa Token (Multi Token)",
      abstract:
        "ERC-1155 cho phép một hợp đồng quản lý nhiều loại token cùng lúc: vừa fungible, vừa non-fungible, vừa semi-fungible, với khả năng chuyển hàng loạt.",
      summary: "Một hợp đồng quản lý nhiều loại token, tối ưu cho game và marketplace.",
      description: "Giao diện chuẩn cho hợp đồng quản lý nhiều loại token.",
    },
    learning: {
      en: {
        beginner: "ERC-1155 lets one contract hold many token types at once — great for games with lots of items.",
        intermediate: "It supports batch transfers and balance queries, drastically reducing gas for managing many token IDs.",
        advanced: "The single-contract design shares approval state across all IDs and uses balanceOfBatch/safeBatchTransferFrom for efficient bulk operations.",
      },
      vi: {
        beginner: "ERC-1155 cho phép một hợp đồng chứa nhiều loại token cùng lúc — rất hợp cho game có nhiều vật phẩm.",
        intermediate: "Nó hỗ trợ chuyển và truy vấn số dư hàng loạt, giảm mạnh chi phí gas khi quản lý nhiều token ID.",
        advanced: "Thiết kế một hợp đồng dùng chung trạng thái phê duyệt cho mọi ID và dùng balanceOfBatch/safeBatchTransferFrom cho thao tác hàng loạt hiệu quả.",
      },
    },
  },
  {
    id: 4337,
    vi: {
      title: "Account Abstraction qua Mempool Phụ",
      abstract:
        "ERC-4337 mang lại trừu tượng hoá tài khoản mà không cần thay đổi tầng đồng thuận, cho phép ví hoạt động như smart contract với cơ chế thanh toán gas linh hoạt.",
      summary: "Cho phép ví hoạt động như smart contract và thanh toán gas linh hoạt.",
      description: "Trừu tượng hoá tài khoản không cần thay đổi giao thức.",
    },
    learning: {
      en: {
        beginner: "ERC-4337 lets your wallet act like a smart contract — pay gas with any token, batch actions, and recover access more safely.",
        intermediate: "Users send UserOperations to an alt-mempool; bundlers package them into a single transaction sent to a global EntryPoint contract.",
        advanced: "Paymasters sponsor or abstract gas; the EntryPoint enforces validation/execution separation and signature aggregation, all without consensus-layer changes.",
      },
      vi: {
        beginner: "ERC-4337 cho phép ví hoạt động như smart contract — trả gas bằng token bất kỳ, gộp nhiều thao tác và khôi phục quyền truy cập an toàn hơn.",
        intermediate: "Người dùng gửi UserOperation vào một mempool phụ; bundler đóng gói chúng thành một giao dịch gửi tới hợp đồng EntryPoint chung.",
        advanced: "Paymaster tài trợ hoặc trừu tượng hoá gas; EntryPoint tách biệt giai đoạn xác thực/thực thi và tổng hợp chữ ký, tất cả không cần thay đổi tầng đồng thuận.",
      },
    },
  },
  {
    id: 4626,
    vi: {
      title: "Chuẩn Vault Token Hoá",
      abstract:
        "ERC-4626 chuẩn hoá vault sinh lợi: gửi tài sản ERC-20 và nhận lại token đại diện cho phần sở hữu (shares), giúp các giao thức DeFi tương thích với nhau.",
      summary: "Chuẩn cho vault, quản lý tài sản sinh lợi trong DeFi.",
      description: "Chuẩn cho vault token hoá sinh lợi.",
    },
    learning: {
      en: {
        beginner: "ERC-4626 standardizes 'yield vaults' — deposit tokens, get shares that grow in value over time.",
        intermediate: "It extends ERC-20 with deposit/mint/withdraw/redeem and convertToShares/convertToAssets for predictable accounting.",
        advanced: "Standardizing the share<>asset conversion lets aggregators compose vaults safely, though implementers must guard against inflation/donation attacks on first deposit.",
      },
      vi: {
        beginner: "ERC-4626 chuẩn hoá 'vault sinh lợi' — gửi token, nhận shares tăng giá trị theo thời gian.",
        intermediate: "Nó mở rộng ERC-20 với deposit/mint/withdraw/redeem và convertToShares/convertToAssets để kế toán nhất quán.",
        advanced: "Chuẩn hoá chuyển đổi share<>asset giúp các aggregator kết hợp vault an toàn, nhưng người triển khai phải phòng tấn công inflation/donation ở lần gửi đầu.",
      },
    },
  },
  {
    id: 712,
    vi: {
      title: "Ký Dữ Liệu Có Cấu Trúc (Typed Data)",
      abstract:
        "EIP-712 định nghĩa cách băm và ký dữ liệu có cấu trúc thay vì chỉ chuỗi byte, giúp người dùng đọc hiểu nội dung mình đang ký trong ví.",
      summary: "Chuẩn ký dữ liệu có cấu trúc (typed data), dễ đọc và an toàn hơn.",
      description: "Băm và ký dữ liệu có cấu trúc.",
    },
    learning: {
      en: {
        beginner: "EIP-712 makes signing messages human-readable — you see exactly what you approve instead of a random hash.",
        intermediate: "It defines a deterministic encoding of typed structs and a domain separator to prevent cross-app/cross-chain replay.",
        advanced: "The domainSeparator binds signatures to a contract, chainId and version, forming the basis for permit, meta-transactions and order signing.",
      },
      vi: {
        beginner: "EIP-712 giúp việc ký thông điệp dễ đọc — bạn thấy rõ mình đang chấp thuận gì thay vì một mã băm khó hiểu.",
        intermediate: "Nó định nghĩa cách mã hoá tất định cho struct có kiểu và một domain separator để chống phát lại giữa ứng dụng/chuỗi.",
        advanced: "domainSeparator gắn chữ ký với một hợp đồng, chainId và version, là nền tảng cho permit, meta-transaction và ký lệnh giao dịch.",
      },
    },
  },
  {
    id: 2612,
    vi: {
      title: "Mở Rộng Permit cho ERC-20",
      abstract:
        "EIP-2612 cho phép phê duyệt token ERC-20 bằng chữ ký EIP-712 thay vì giao dịch on-chain, tạo nên các phê duyệt không tốn gas (gasless).",
      summary: "Cho phép approve token bằng chữ ký (không cần giao dịch).",
      description: "Phê duyệt ERC-20 bằng chữ ký.",
    },
    learning: {
      en: {
        beginner: "EIP-2612 lets you approve tokens with a signature — no separate transaction, no extra gas.",
        intermediate: "It adds a permit() function that accepts an EIP-712 signature, replacing the classic approve transaction.",
        advanced: "permit uses per-owner nonces and deadlines to prevent replay, enabling single-transaction approve+swap flows and gas sponsorship.",
      },
      vi: {
        beginner: "EIP-2612 cho phép phê duyệt token bằng chữ ký — không cần giao dịch riêng, không tốn thêm gas.",
        intermediate: "Nó thêm hàm permit() nhận chữ ký EIP-712, thay cho giao dịch approve truyền thống.",
        advanced: "permit dùng nonce theo từng chủ sở hữu và deadline để chống phát lại, cho phép luồng approve+swap trong một giao dịch và tài trợ gas.",
      },
    },
  },
  {
    id: 1559,
    vi: {
      title: "Cơ Chế Phí Mới (Base Fee)",
      abstract:
        "EIP-1559 thay đổi cơ chế tính phí giao dịch với một base fee cố định mỗi block bị đốt, giúp phí dễ dự đoán hơn và giảm phát ETH.",
      summary: "Cơ chế phí giao dịch mới với base fee bị đốt.",
      description: "Cơ chế thị trường phí với base fee bị đốt.",
    },
    learning: {
      en: {
        beginner: "EIP-1559 made gas fees more predictable and started burning a portion of every fee, reducing ETH supply.",
        intermediate: "Each block has a base fee that adjusts with demand and is burned; users add an optional priority tip for validators.",
        advanced: "Base fee targets 50% block fullness via an exponential adjustment, making fees responsive to congestion while the burn makes ETH deflationary under load.",
      },
      vi: {
        beginner: "EIP-1559 giúp phí gas dễ dự đoán hơn và bắt đầu đốt một phần mỗi khoản phí, làm giảm nguồn cung ETH.",
        intermediate: "Mỗi block có base fee điều chỉnh theo nhu cầu và bị đốt; người dùng thêm tip ưu tiên tuỳ chọn cho validator.",
        advanced: "Base fee hướng tới 50% độ đầy block qua điều chỉnh hàm mũ, giúp phí phản ứng với tắc nghẽn, còn việc đốt khiến ETH giảm phát khi tải cao.",
      },
    },
  },
];
