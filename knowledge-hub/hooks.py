import re

_FAVICON = re.compile(r'\n\s*<link rel="icon" href="[^"]*">')
_THEAD = re.compile(r"<thead>.*?</thead>", re.S)
_TH_NO_SCOPE = re.compile(r"<th(?=[\s>])(?![^>]*\bscope=)([^>]*)>")


def _add_scope(match):
    """Give every column header cell scope="col" so screen readers tie data cells to their header."""
    return _TH_NO_SCOPE.sub(r'<th scope="col"\1>', match.group(0))


def on_post_page(output, page, config):
    """Leave the browser tab on its default icon, and mark table column headers for accessibility."""
    output = _FAVICON.sub("", output, count=1)
    return _THEAD.sub(_add_scope, output)
