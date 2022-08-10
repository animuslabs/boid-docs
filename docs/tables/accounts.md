# Accounts Table
Every Boid user needs a row in the accounts table. The accounts table reserves a unique boid_id, tracks power, staking, authentication, team and any other unique elements about a boid user. Many users could use Boid entirely using only their Boid Account + the built in key authentication without any need for a native chain account (however it's easy for them to attach a native account when ready).
[Source File](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/accounts.ts)

|Index|Scope|
|-|-|
|boid_id|contract account|

### Table Structure
```js
boid_id:Name
owners:Name[]
auth:AccountAuth
sponsors:Name[]
stake:AccountStake
power:AccountPower
team:AccountTeam
social_ipfs_json:string
balance:u32
nft_balance:u16
```

### boid_id:Name
***
An eosio Name type. System can define an arbitrary name but users must follow rules when buying an account such as using a whitelisted suffix. Ex: if .oid is a whitelisted suffix then users must specify acctname.oid when creating a boid account.

### owners:Name[]
***
A vector of Names. The owners are native chain accounts that can authorize actions on behalf of this boid account. Owner accounts can only be added/removed by other Owners on the account.

### auth:AccountAuth
***
Stores data used for key based authentication for the boid account. Account keys can be used to authenticate most actions on the account.

***AccountAuth***
```js
keys:PublicKey[] // pubkeys that can be used to control this boid account
nonce:u32 // incremented by the auth action when a pubkey is used. Necessary to prevent transaction replays.
```

### sponsors:Name[]
***
An array of boid_ids that sponsored the creation of the account. When the Boid Power is applied to the boid account some percent is shared with the sponsors. Usually the account just has one. When the account is upgraded the sponsor is removed.

### stake:AccountStake
***
Contains all data related to the stake associated with this account.
```js
  unstaking:TokenUnstake[] // contains one entry when tokens are being unstaked, empty otherwise
  self_staked:u32 // whole BOID quality staked to the account, BOID earned from power claiming is also added here.
  received_delegated_stake:u16 // stake delegated to this account (could be self delegated also) delegated stakes are counted in incremenets of 10k so 1 delgated stake means 10k BOID
```

#### unstaking
A vector of TokenUnstake objects.
##### redeemable_after_round
After this round the stake can be unstaked
##### quantity
The amount of BOID staked (whole numbers)

### AccountTeam
Holds all information about the accounts team participation

```js
team_id:u16// User is on this team, from teams table
last_edit_round:u16 // Used to track when was the last time the team or tax_pct was changed.
team_tax_pct:u8 // The percentage user wishes to pay to their team, if the team owner sets a higher value it will override this.
team_cumulative_contribution:u32 // Total contributed towards this team. Resest on team change.
```

