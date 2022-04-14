import { palette } from '@frontend/design-system'
import { TestModificationTypeEnum } from '@frontend/dashboard/src/graphql-codegen-operations.gen'

export const getModificationTypeDisplayInfo = (
  modificationType: TestModificationTypeEnum
) => {
  if (modificationType === 'NEW') {
    return {
      label: 'First Seen',
      compactLabel: 'F',
      color: palette.jade500,
      borderColor: palette.jade100,
    }
  }

  return {
    label: 'Modified',
    compactLabel: 'M',
    color: palette.orange500,
    borderColor: palette.orange100,
  }
}
