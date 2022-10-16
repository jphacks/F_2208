# 初回のみ

## git がインストールされていることを確認する

```bash
$ git -v
```

## composer がインストールされていることを確認する

```bash
$ composer -V
```

インストールされていなければ、[Composer の使い方](https://qiita.com/sano1202/items/50e5a05227d739302761)を参考にインストールする。

Homebrew がインストールされていれば、下記コマンドでインストールするのが望ましい。

```bash
$ brew install composer
```

## リポジトリを clone する

```bash
$ git clone git@github.com:jphacks/F_2208.git
```

## ルートディレクトリへ移動する

```bash
$ cd F_2208
```

## バックエンドのルートディレクトリへ移動する

```bash
$ cd backend
```

## backend ブランチへ checkout(移動)する

```bash
$ git checkout backend
```

基本的にこのディレクトリにいてください。

## 開発に必要なパッケージをインストールする

```bash
$ composer install
```

## 環境変数を設定する

```bash
$ cp .env.example .env
```

```bash
$ ./vendor/bin/sail up
```

## プレビュー環境を実行する

このコマンドを実行する前に、 Docker が起動しているか確認してください。

```bash
$ vendor/bin/sail artisan key:generate
```

[Sail へのパスを通す](https://omkz.net/laravel-sail/#index_id3)を参考に、パスを通せば以下のように簡略化することもできる。

```bash
$ sail up
```

終了する場合は、`⌘+C` を入力する。

# 開発中

## pull する

```bash
$ git pull
```

リモートリポジトリをローカルリポジトリへ反映します。定期的に実行してください。

## 開発に必要なパッケージをインストールする

```bash
$ composer install
```

こちらも定期的に実行してください（正確には、 `package.json` が更新された場合のみで大丈夫です）。
いずれかのパッケージの Not found エラーが発生した場合に、こちらを実行すると解決する場合があります。

## プレビュー環境を実行する

```bash
$ ./vendor/bin/sail up
```

終了する場合は、`⌘+C` を入力する。

# sail コマンド

[php artisan コマンド](https://qiita.com/zaburo/items/37768b743ed6d0e28bf5)で紹介されているコマンドを参照。
ただし、`php` は `sail` に置き換えて使用してください。
