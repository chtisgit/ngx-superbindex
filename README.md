# ngx-superbindex

This is a **fork** of [ngx-superbindex](https://github.com/gibatronic/ngx-superbindex) tuned to my likings. Thanks for the good work!

<img align="right" hspace="16" vspace="16" src="https://i.giphy.com/media/zMrfG2vm1JXscCI7Ka/source.gif" width="267" height="572">

Like [ngx-autoindex](http://nginx.org/en/docs/http/ngx_http_autoindex_module.html), but superb!

* Single, standalone file
* Automatic light-dark theme
* Colors by [base16](http://chriskempson.com/projects/base16/)
* Monospaced type
* Minimal UI
* Search as you type
* Easily override colors through parameters
* Works in every modern browser and gracefully degrades in Internet Explorer and Safari

## Requirements

[nginx](http://nginx.org/) with the [xslt](http://nginx.org/en/docs/http/ngx_http_xslt_module.html) module. On Mac with [Homebrew](http://brew.sh/) it's as easy as:

```bash
brew tap denji/nginx
brew install nginx-full --with-xslt
```

## Usage

1. Download [`superbindex.xslt`](https://github.com/chtisgit/ngx-superbindex/releases/latest) into /srv/www.

2. Add the following lines to your `nginx.conf` location:
    ```nginx
    location / {
        autoindex on;
        autoindex_format xml;

        xslt_string_param root '/'; # this should match location
        xslt_string_param path $request_uri;
        xslt_stylesheet /srv/www/superbindex.xslt;
    }
    ```

3. Restart nginx with `nginx -s reload` and *voilà*!

## Color theme

A different color theme may be used by adding the following parameters:

```nginx
location / {
    xslt_string_param color-base00 '#FFFFFF';
    xslt_string_param color-base07 '#000000';
    xslt_string_param color-base0D '#0000FF';
    xslt_string_param color-base0E '#C722EA';
}
```

This one is very good. There is no need for other themes.

## Navigation

The user can navigate with the mouse or the keyboard. Keyboard allows for very fast navigation.

* Enter a part of a name of the file or the directory you want to open on the keyboard. Choose a unique part of
  the name, e.g. if you have 3 directories:
  * vacation2018/
  * vacation2019/
  * vacation2020/

  don't type "vac", but "18", "19" or "020", then press return to enter the respective directory.
* Mistyped? Hit *Backspace* to remove the last typed character or *Escape* to reset the selection entirely.
* Entered the wrong directory? Hitting *Backspace* will highlight the parent directory "..", then hit *Return* to move up. If you have an active selection get rid of it by hitting *Escape* before using *Backspace*.
