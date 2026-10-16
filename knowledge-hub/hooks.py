import re

_FAVICON = re.compile(r'\n\s*<link rel="icon" href="[^"]*">')


def on_post_page(output, page, config):
    """Leave the browser tab on its default icon instead of the theme logo."""
    return _FAVICON.sub("", output, count=1)
