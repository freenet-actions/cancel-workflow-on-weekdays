# Cancel Workflow on Weekdays

[![LICENSE](https://img.shields.io/github/license/freenet-actions/cancel-workflow-on-weekdays)](https://github.com/freenet-actions/cancel-workflow-on-weekdays/blob/main/LICENSE)

This action blocks the current workflow if it was run on one of the specified weekdays.

## Inputs

### `blocked_days`

A not case-sensitive list of weekdays (0-6 or English words) that workflows calling this action should be blocked on. Separated either through lines, or commas, or both. See below for more detailed info and examples.

**0 = Sunday...6 = Saturday**

## Outputs

### `cancellation_reason`

The reason of the cancellation of the workflow. Empty if the workflow was not cancelled.

## Usage

#### This action should be run before any steps that might affect any systems, preferably as the first step of the deployment process.

### Cancelling during the weekend (Friday to Sunday)

```yaml
uses: freenet-actions/cancel-workflow-on-weekdays@v1
```

### Cancelling on specific days

```yaml
uses: freenet-actions/cancel-workflow-on-weekdays@v1
with:
  blocked_days: |
    saturday
    sunday
    monday
```

### Cancelling on specific days (in a single line)

**Note:** Spaces after the commas are *optional*.

```yaml
uses: freenet-actions/cancel-workflow-on-weekdays@v1
with:
  blocked_days: 'saturday, sunday, monday'
```

### Cancelling on specific days (using numbers)

**Note:** Also works in a single line, see above.

```yaml
uses: freenet-actions/cancel-workflow-on-weekdays@v1
with:
  blocked_days: |
    6
    0
    1
```

### Cancelling based on workflow variables

#### Only cancelling if the `environment` is `prod`

```yaml
if: github.event.inputs.environment == 'prod'
uses: freenet-actions/cancel-workflow-on-weekdays@v1
with:
  blocked_days: 'saturday, sunday, monday'
```

#### Only cancelling if the input `enforce` is `false`

```yaml
if: github.event.inputs.enforce == 'false'
uses: freenet-actions/cancel-workflow-on-weekdays@v1
with:
  blocked_days: 'saturday, sunday, monday'
```
