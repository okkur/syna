## Contributor license agreement

By submitting code as an individual you agree to the
[individual contributor license agreement](/CLA/INDIVIDUAL_CONTRIBUTOR_LICENSE_AGREEMENT.md).  
By submitting code as an entity you agree to the
[corporate contributor license agreement](/CLA/CORPORATE_CONTRIBUTOR_LICENSE_AGREEMENT.md).  

<!-- Should always come as first item in contributor guide! -->

---

## Contribute to Project

Thank you for your interest in contributing to Syna Theme.  
This guide helps make contributing to Syna Theme simple and efficient for everyone.

### First contribution

If you are starting out contributing to Syna Theme, there might be smaller scoped "starter issues" available:
[Current starter issues](https://github.com/okkur/syna/labels/starter%20issue)

Any changes in CSS/JS files or fonts require webpack which is managed with `package.json`'s npm scripts. You need to run the following commands which would install the required dependencies for building the changed files and start webpack for the build process itself.

```
make dep # Would install package.json's dependencies
make dev # Would start the build process for development
```

Prerequisites: node and yarn need to be installed on your system.

`make dev` would start webpack and any change you make to JS or CSS files would result in a build that is located in `static/`.

Keep in mind that JS and CSS files located in `static/` are bundled automatically reflecting the current state of the `static-main/` directory. Any file required in JS or style files (css, scss) is also bundled and put in `static/` directory from `static-main/`. Font files or images loaded in style files that have a relative path follow this rule.

On the other hand changes to layout files only need hugo. There is a demo available that we use to test as well as a demo. Any change to the entire site needs to be tested in the demo. If there is a new fragment it needs to be added to the demo as well. Demo is located in `exampleSite/` directory and it can be built using the following commands:

```
cd exampleSite
hugo -c content --config config.toml server -D
```

These commands will change the working directory to the demo directory and build that directory in watch mode (so any changes are reflected) with Syna as the theme.

### Report bug

If you are sure you found a bug and no issue exists yet, please feel free to create an issue following the [issue template](/.github/ISSUE_TEMPLATE.md).

### New feature

As your time is precious and not all features might be in the scope of what the Syna Theme wants to achieve, please open up an issue first.

It would be helpful to answer some questions:
  * Why do you need this feature?
  * Why do you think it might be valuable for other users?
  * How would you implement the feature?

## Helping Others

Please help other users whenever you can.

## User Support/Questions

Non technical or user centric support might be available from the community for more information read our [support guidelines](/SUPPORT.md)

## Issue/Pull Request/Merge Request Closing Policy

Time is precious and sparse, please consider this and search through available issues first.

Treat every participant with courtesy, respect and add as much information when creating an issue or pull/merge request.

All issues and pull/merge requests should be in English and refrain from using any inappropriate language.

Any issues or pull/merge requests not following our [code of conduct](/CODE_OF_CONDUCT.md) or any other guidelines provided may be closed without notice out of respect for our volunteers.

Inactive issues or pull/merge requests may be closed after a specific period. This enables us to focus and work on the current/primary items.

### Pull Request/Merge Request Guidelines

Please keep the change in a single pull/merge request **as small as possible**.  
If you want to contribute a large feature think very hard what the minimum viable change is.  
The smaller a pull/merge request is the more likely it is it will be merged (quickly).  
Afterwards follow-up requests for enhancements are appreciated.  

### Contribution Acceptance Criteria

* The change is as small as possible
* Includes proper tests and passes all tests
* Does not break any existing functionality
* Fixes one specific issue or implements one specific feature (do not combine things, send separate requests if needed)
* Contains functionality we think other users will benefit from too
* If the request adds any new libraries, they should have a compatible license.
