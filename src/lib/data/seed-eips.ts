import type { Eip } from "../types";

/**
 * Curated, real-metadata dataset of the most notable EIPs/ERCs.
 * Used to power the explorer out-of-the-box (and as the seed source for
 * the database). The full corpus (1200+ proposals) is hydrated by the
 * ingestion pipeline in `scripts/ingest.ts`.
 */
export const SEED_EIPS: Eip[] = [
  {
    id: 20,
    title: "Fungible Token Standard",
    description: "A standard interface for fungible (replaceable) tokens.",
    authors: ["Fabian Vogelsteller", "Vitalik Buterin"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    bucket: "token",
    created: "2015-11-19",
    requires: [],
    replaces: [],
    tags: ["token", "fungible", "erc", "transfer", "allowance"],
    body: `## Abstract

The following standard allows for the implementation of a standard API for tokens within smart contracts. This standard provides basic functionality to transfer tokens, as well as allow tokens to be approved so they can be spent by another on-chain third party.

## Motivation

A standard interface allows any tokens on Ethereum to be re-used by other applications: from wallets to decentralized exchanges.

## Specification

### Methods

\`\`\`solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
\`\`\`

### Events

\`\`\`solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
\`\`\`
`,
    views: 124000,
    favorites: 12400,
    popularity: 100,
  },
  {
    id: 721,
    title: "Non-Fungible Token Standard",
    description: "A standard interface for non-fungible tokens, also known as deeds.",
    authors: ["William Entriken", "Dieter Shirley", "Jacob Evans", "Nastassia Sachs"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    bucket: "nft",
    created: "2018-01-24",
    requires: [165],
    replaces: [],
    tags: ["nft", "non-fungible", "erc", "deed", "collectible"],
    body: `## Abstract

A standard interface for non-fungible tokens (NFTs). This standard provides basic functionality to track and transfer NFTs.

## Motivation

NFTs can represent ownership over digital or physical assets — houses, virtual collectibles, negative-value assets such as loans. We considered use cases of NFTs being owned and transacted by individuals as well as third-party operators.

## Specification

\`\`\`solidity
function balanceOf(address _owner) external view returns (uint256);
function ownerOf(uint256 _tokenId) external view returns (address);
function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
function approve(address _approved, uint256 _tokenId) external payable;
\`\`\`
`,
    views: 98000,
    favorites: 9800,
    popularity: 95,
  },
  {
    id: 1155,
    title: "Multi Token Standard",
    description: "A standard interface for contracts that manage multiple token types.",
    authors: ["Witek Radomski", "Andrew Cooke", "Philippe Castonguay", "James Therien"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    bucket: "nft",
    created: "2018-06-17",
    requires: [165],
    replaces: [],
    tags: ["multi-token", "nft", "fungible", "semi-fungible", "batch"],
    body: `## Abstract

A standard interface for contracts that manage multiple token types. A single deployed contract may include any combination of fungible tokens, non-fungible tokens or other configurations (e.g. semi-fungible tokens).

## Motivation

Tokens standards like ERC-20 and ERC-721 require a separate contract to be deployed for each token type or collection. This standard allows for each token ID to represent a new configurable token type.`,
    views: 67000,
    favorites: 6700,
    popularity: 90,
  },
  {
    id: 4626,
    title: "Tokenized Vault Standard",
    description: "A standard for tokenized yield-bearing vaults.",
    authors: ["Joey Santoro", "t11s", "Jet Jadeja", "Alberto Cuesta Cañada", "Señor Doggo"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    bucket: "defi",
    created: "2021-12-22",
    requires: [20],
    replaces: [],
    tags: ["vault", "yield", "defi", "erc-20", "shares"],
    body: `## Abstract

The following standard allows for the implementation of a standard API for tokenized Vaults representing shares of a single underlying ERC-20 token. This standard is an extension of the ERC-20 token that provides basic functionality for depositing and withdrawing tokens and reading balances.`,
    views: 42000,
    favorites: 4200,
    popularity: 82,
  },
  {
    id: 4337,
    title: "Account Abstraction Using Alt Mempool",
    description: "An account abstraction proposal which avoids consensus-layer protocol changes.",
    authors: ["Vitalik Buterin", "Yoav Weiss", "Dror Tirosh", "Shahaf Nacson", "Kristof Gazso"],
    status: "Draft",
    type: "Standards Track",
    category: "ERC",
    bucket: "wallet",
    created: "2021-09-29",
    requires: [155, 165, 1271],
    replaces: [],
    tags: ["account-abstraction", "smart-wallet", "gas-sponsor", "bundler", "userop"],
    body: `## Abstract

An account abstraction proposal which completely avoids the need for consensus-layer protocol changes. Instead of adding new protocol features and changing the bottom-layer transaction type, this proposal introduces a higher-layer pseudo-transaction object called a \`UserOperation\`.`,
    views: 49000,
    favorites: 4900,
    popularity: 88,
  },
  {
    id: 3643,
    title: "T-REX - Token for Regulated EXchanges",
    description: "An institutional grade security token standard with on-chain KYC/AML compliance.",
    authors: ["Joachim Lebrun", "Tony Malghem", "Kevin Thizy", "Luc Falempin", "Adam Boudjemaa"],
    status: "Draft",
    type: "Standards Track",
    category: "ERC",
    bucket: "identity",
    created: "2021-07-09",
    requires: [20, 173],
    replaces: [],
    tags: ["security-token", "rwa", "kyc", "aml", "compliance"],
    body: `## Abstract

The T-REX standard is a set of smart contracts establishing a framework for issuing, managing and transferring permissioned (security) tokens with built-in identity and compliance checks for regulated exchanges.`,
    views: 18000,
    favorites: 1800,
    popularity: 70,
  },
  {
    id: 2981,
    title: "NFT Royalty Standard",
    description: "A standardized way to retrieve royalty payment information for NFTs.",
    authors: ["Zach Burks", "James Morgan", "Blaine Malone", "James Seibel"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    bucket: "metadata",
    created: "2020-09-15",
    requires: [165],
    replaces: [],
    tags: ["nft", "royalty", "marketplace", "metadata"],
    body: `## Abstract

This standard allows contracts, such as NFTs that support ERC-721 and ERC-1155 interfaces, to signal a royalty amount to be paid to the NFT creator or rights holder every time the NFT is sold or re-sold.`,
    views: 31000,
    favorites: 3100,
    popularity: 76,
  },
  {
    id: 1822,
    title: "Universal Upgradeable Proxy Standard (UUPS)",
    description: "A minimal-overhead upgradeable proxy pattern (UUPS).",
    authors: ["Gabriel Barros", "Patrick Gallagher"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    bucket: "security",
    created: "2019-03-04",
    requires: [],
    replaces: [],
    tags: ["proxy", "upgradeable", "uups", "delegatecall"],
    body: `## Abstract

This standard presents a minimal proxy contract which uses a fixed storage slot for the logic contract address and delegates upgrade logic to the implementation contract itself (UUPS pattern).`,
    views: 27000,
    favorites: 2700,
    popularity: 73,
  },
  {
    id: 1967,
    title: "Proxy Storage Slots",
    description: "A consistent location where proxies store the address of the logic contract.",
    authors: ["Santiago Palladino", "Francisco Giordano", "Hadrien Croubois"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    bucket: "security",
    created: "2019-04-24",
    requires: [],
    replaces: [],
    tags: ["proxy", "storage", "transparent", "upgradeable"],
    body: `## Abstract

Delegating proxy contracts are widely used for upgradeability and gas savings. This standard proposes a set of standard slots to store proxy information, avoiding clashes with the storage of the logic contract.`,
    views: 25000,
    favorites: 2500,
    popularity: 71,
  },
  {
    id: 165,
    title: "Standard Interface Detection",
    description: "Creates a standard method to publish and detect what interfaces a contract implements.",
    authors: ["Christian Reitwießner", "Nick Johnson", "Fabian Vogelsteller", "Jordi Baylina"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    bucket: "infrastructure",
    created: "2018-01-23",
    requires: [],
    replaces: [],
    tags: ["interface", "detection", "introspection"],
    body: `## Abstract

This standard creates a standard method to publish and detect what interfaces a smart contract implements via the \`supportsInterface\` function.`,
    views: 36000,
    favorites: 3600,
    popularity: 79,
  },
  {
    id: 712,
    title: "Typed Structured Data Hashing and Signing",
    description: "A procedure for hashing and signing of typed structured data, not just bytestrings.",
    authors: ["Remco Bloemen", "Leonid Logvinov", "Jacob Evans"],
    status: "Final",
    type: "Standards Track",
    category: "Interface",
    bucket: "signature",
    created: "2017-09-12",
    requires: [155, 191],
    replaces: [],
    tags: ["signature", "typed-data", "eip-712", "hashing"],
    body: `## Abstract

This is a standard for hashing and signing of typed structured data as opposed to just bytestrings. It includes a theoretical framework for correctness of encoding functions, specification of structured data closely resembling Solidity structs, and a safe hashing algorithm.`,
    views: 53000,
    favorites: 5300,
    popularity: 86,
  },
  {
    id: 2612,
    title: "Permit Extension for EIP-20 Signed Approvals",
    description: "ERC-20 approvals via EIP-712 secp256k1 signatures (gasless approvals).",
    authors: ["Martin Lundfall"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    bucket: "signature",
    created: "2020-04-13",
    requires: [20, 712],
    replaces: [],
    tags: ["permit", "approval", "gasless", "signature", "erc-20"],
    body: `## Abstract

Arguably one of the main reasons for the success of ERC-20 tokens lies in the interplay between \`approve\` and \`transferFrom\`. \`permit\` extends this by allowing approvals to be made via secp256k1 signatures, enabling gasless token approvals.`,
    views: 38000,
    favorites: 3800,
    popularity: 80,
  },
  {
    id: 1559,
    title: "Fee market change for ETH 1.0 chain",
    description: "A transaction pricing mechanism with a fixed-per-block base fee that is burned.",
    authors: ["Vitalik Buterin", "Eric Conner", "Rick Dudley", "Matthew Slipper", "Ian Norden"],
    status: "Final",
    type: "Standards Track",
    category: "Core",
    bucket: "infrastructure",
    created: "2019-04-13",
    requires: [2718, 2930],
    replaces: [],
    tags: ["fee-market", "base-fee", "gas", "burn", "core"],
    body: `## Abstract

A transaction pricing mechanism that includes a fixed-per-block network fee that is burned and dynamically expands/contracts block sizes to deal with transient congestion.`,
    views: 61000,
    favorites: 6100,
    popularity: 92,
  },
  {
    id: 1271,
    title: "Standard Signature Validation Method for Contracts",
    description: "Standard way to verify a signature when the account is a smart contract.",
    authors: ["Francisco Giordano", "Matt Condon", "Philippe Castonguay", "Amir Bandeali"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    bucket: "signature",
    created: "2018-07-25",
    requires: [165],
    replaces: [],
    tags: ["signature", "smart-contract", "validation", "isValidSignature"],
    body: `## Abstract

Externally Owned Accounts (EOA) can sign messages with their private keys, but contract accounts cannot. This standard defines a way for contracts to verify if a provided signature is valid via \`isValidSignature\`.`,
    views: 22000,
    favorites: 2200,
    popularity: 69,
  },
  {
    id: 173,
    title: "Contract Ownership Standard",
    description: "A standard interface for ownership of contracts.",
    authors: ["Nick Mudge", "Dan Finlay"],
    status: "Review",
    type: "Standards Track",
    category: "ERC",
    bucket: "security",
    created: "2018-06-07",
    requires: [165],
    replaces: [],
    tags: ["ownership", "access-control", "owner"],
    body: `## Abstract

This specification defines standard functions for owning or controlling a contract via an \`owner\` address and \`transferOwnership\`.`,
    views: 19000,
    favorites: 1900,
    popularity: 66,
  },
  {
    id: 777,
    title: "Token Standard",
    description: "An improved fungible token standard with hooks (operators and send).",
    authors: ["Jacques Dafflon", "Jordi Baylina", "Thomas Shababi"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    bucket: "token",
    created: "2017-11-20",
    requires: [165, 1820],
    replaces: [],
    tags: ["token", "hooks", "operators", "send"],
    body: `## Abstract

This standard defines a new way to interact with a token contract while remaining backward compatible with ERC-20. It defines advanced features such as operators and send hooks.`,
    views: 17000,
    favorites: 1700,
    popularity: 62,
  },
  {
    id: 4361,
    title: "Sign-In with Ethereum",
    description: "Off-chain authentication for Ethereum accounts to establish sessions.",
    authors: ["Wayne Chang", "Gregory Rocco", "Brantly Millegan", "Nick Johnson", "Oliver Terbu"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    bucket: "identity",
    created: "2021-10-11",
    requires: [55, 137, 155, 191],
    replaces: [],
    tags: ["auth", "siwe", "identity", "session", "login"],
    body: `## Abstract

Sign-In with Ethereum describes how Ethereum accounts authenticate with off-chain services by signing a standard message format parameterized by scope, session details, and security mechanisms.`,
    views: 28000,
    favorites: 2800,
    popularity: 74,
  },
  {
    id: 6551,
    title: "Non-fungible Token Bound Accounts",
    description: "An interface and registry for smart contract accounts owned by NFTs.",
    authors: ["Jayden Windle", "Benny Giang", "Steve Jang", "Druzy Downs", "Raymond Huynh"],
    status: "Review",
    type: "Standards Track",
    category: "ERC",
    bucket: "nft",
    created: "2023-02-23",
    requires: [165, 721, 1167, 1271],
    replaces: [],
    tags: ["nft", "tba", "account", "registry"],
    body: `## Abstract

This proposal defines a system which assigns Ethereum accounts to all non-fungible tokens. These token bound accounts allow NFTs to own assets and interact with applications.`,
    views: 21000,
    favorites: 2100,
    popularity: 68,
  },
  {
    id: 7528,
    title: "ETH (Native Asset) Address Convention",
    description: "An address placeholder for ETH when used in the same context as ERC-20 tokens.",
    authors: ["Joey Santoro"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    bucket: "token",
    created: "2023-10-03",
    requires: [55, 20],
    replaces: [],
    tags: ["eth", "native", "address", "convention"],
    body: `## Abstract

The following standard proposes a convention for using the address \`0xEeee...EEeE\` in contexts where an address is used to represent ETH in the same way as an ERC-20 token.`,
    views: 9000,
    favorites: 900,
    popularity: 55,
  },
  {
    id: 4907,
    title: "Rental NFT, an Extension of EIP-721",
    description: "Adds a time-limited role with restricted permissions (user) to ERC-721 tokens.",
    authors: ["Anders", "Lance", "Bruce Xu", "Wizard Wang"],
    status: "Final",
    type: "Standards Track",
    category: "ERC",
    bucket: "nft",
    created: "2022-03-11",
    requires: [165, 721],
    replaces: [],
    tags: ["nft", "rental", "user", "expires"],
    body: `## Abstract

This standard is an extension of ERC-721. It proposes an additional role (\`user\`) which can be granted to addresses, and a time when the role automatically expires, enabling NFT rentals.`,
    views: 14000,
    favorites: 1400,
    popularity: 60,
  },
];
