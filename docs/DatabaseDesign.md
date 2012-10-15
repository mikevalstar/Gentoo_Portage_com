# Database Design
## Table Structure

* category
* package
** -> category (1:many)
* package_changelog
** -> package (1:1)
* package_use
** -> package (1:many)
* ebuild
** -> package (1:many)
* ebuild_content
** -> ebuild (1:1)
* ebuild_use
** -> ebuild (1:many)
* use_flag
* keyword
* glsa

## Table Details