# 💰貯Pay箱

![ピッグピングgif](https://user-images.githubusercontent.com/73621966/197318588-40b5eba0-01ab-45e2-b9e1-18bbb04415fd.gif)

## <br><br>🐽製品概要

### 紹介動画
https://user-images.githubusercontent.com/73621966/197318258-446c7eec-97a1-466f-85b0-f5a715fe631e.mp4

### <br><br>アプリURL

https://f2208.miravy.com/

# <br><br>⛩背景(製品開発のきっかけ、課題等）
## <br>これが令和の貯金箱

### 家族間のコミニュケーションの維持　×　一人暮らし生産性向上<br>
コロナ波が過ぎたかと思いきや、またコロナ、、、 。<br>
その変化に私たちは追われてしまい、家族間など、コミュニティ間で __必要なコミニュケーション__ を取らなくなってしまい、ストレスにつながる。<br>
特に家族間のストレスは、 __子どもの教育環境、働き世代の仕事効率__ などさまざまな分野に影響を与えている。<br>

生活が変わったのは、家族のみならず、 __単身世帯__ だって同じ。<br>
 そんな中、__『あれやりたい!』__ というモチベーションを維持するのはなかなか難しいと感じた。
#### <br> "TO DO" を "WANT TO DO" に ！ <br>
そこで、私たちは、 __①Todoタスクを家族間で共有__ するというアプローチによって、家族間の __コミニュケーション__ を図ろうと考えた。<br>
タスク管理というのは、 __家事分担、子どもの教育、介護の役割分担__ などさまざま。<br>
#### <br>『今日も頑張ったよ』　頑張った人や自分には ”ご褒美” を！<br>
さらに、 __②PayPayなどの電子マネーとTodo管理__ を合わせることで、単身世帯、家族世帯ともに<br>
__楽しくモチベーション維持__ できるアプリを私たちは開発した。

---
 
# 🐷製品説明（具体的な製品の説明）

## 主な画面遷移の構成 
<img width="900" alt="スクリーンショット 2022-10-22 13 39 42" src="https://user-images.githubusercontent.com/92532910/197320061-32fb1c16-0932-4a84-a94c-dc12819a96da.png">

<h2>主な機能について</h2>

<h3>タスクの追加</h3>

![Slide3](https://user-images.githubusercontent.com/103715845/197318223-7df3b9b6-8835-49e2-9c2a-0a59d8eac1ed.jpg)


<h3>QRコードによるフレンド追加</h3>

![Slide4](https://user-images.githubusercontent.com/103715845/197311238-ad4c3426-b628-46e7-8a0e-27d0cf7171d7.jpg)

<h3>入金</h3>

![Slide6](https://user-images.githubusercontent.com/103715845/197318828-cd4e2909-b586-43d3-b489-e0820d4abc3d.jpg)

<h3>出金</h3>

![Slide5](https://user-images.githubusercontent.com/103715845/197311267-ce9ca67c-a86e-4310-9b57-1ed350c43f61.jpg)






## 🍄特長
####  特長1：タスクに対しての モチベーション をアップさせる __2__ つの要素
  * 可愛い子豚 __"ミリック"__ をプロフィール画面に配置し、タスクの完了とともにレベルアップ
  * __PayPay__ による、目に見える報酬
####  特長2： コミュニケーション を円滑にする __２__ つの要素
  * フレンド機能
  * フレンド間でタスク受注、報酬を送り合う機能
####  特長3： 使いやすさ を意識した __３__ つの要素
  * Webアプリなので余計なインストールが __不要__
  * __QRコード__ で簡単にフレンド登録
  * シンプルな機能で、拡張性抜群
####  特長4：従来のタスクアプリに付き物であった フォーマルさ を抑えた設計
  * 子供でも手軽に使える可愛いデザイン
  * 可愛い子豚 __"ミリック"__ が使い方をアドバイス
---
### 🌕解決出来ること

#### ・フレンド間でタスクを送り合う　->　家族などの、集団間でのコミニュケーションの維持 -> コミニュケーション不足によるコンフリクトを防ぐ
#### ・目に見える報酬 -> 家族世帯、単身世帯の生産性向上(モチベーション維持) -> 社会全体のQOL向上

### 🔥今後の展望
*  __ランキングシステム__ などのゲーミフィケーション要素の拡充
*  __Twitter APIと連携__ して、モチベーション向上を図る
*  __Bluetooth__ の活用など,QRコード以外のより使い勝手の良いローカル通信機能の実装
*  __AI__ を活用しアプリ内キャラクターと会話ができるようにする。
* 入出金処理の連携先を拡充。
*  __PWA__ の活用により,モバイルでの利用をより便利にする

### 注力したこと（こだわり等）
* MUIを組み入れることで、デザイン開発の工数を減らしつつ、UI/UXを意識したデザインに創り上げた。
* Issueドリブン開発を取り入れることで、各人の作業内容を可視化し、効率的に開発を進めた。
* GitHub ActionsやNetlifyを活用し、**自動デプロイ**や**CI/CD**によってヒューマンエラーを削減し、迅速なライフサイクルを回す。
* **PayPay**や**Amazonギフトコード**などの外部サービスと連携することで入出金の煩雑さ減らした。
* イラストやアニメーションを多用することで、使っていて"たのしい"アプリを目指した。

## 開発技術
### 活用した技術
![使用技術_仮完成2](https://user-images.githubusercontent.com/103715845/197308202-81cc91ba-7ddf-40e8-92f6-91cfeb532f18.jpg)


### 独自技術
* QRコードによるフレンド交換機能

独自の交換プログラムを開発し、QRコードによるセキュアなフレンド交換を実現した。
