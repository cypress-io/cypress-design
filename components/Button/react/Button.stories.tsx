import * as React from 'react'
import Button from './Button';
import { SizeClassesTable, VariantClassesTable } from '../constants';
import type { ButtonSizes,  ButtonVariants} from '../constants';

export default {
  title: 'Button',
  component: Button,
};


export const Sample = ({ disabled = false }: { disabled?:boolean } = {}) => <div className="flex flex-row flex-wrap gap-3 justify-center">
    {(Object.keys(VariantClassesTable) as ButtonVariants[]).map((variant) => {
          return <div className="flex flex-col items-center gap-3 justify-center mt-4">
            <h3 className="text-right">{variant}</h3>
            {(Object.keys(SizeClassesTable) as ButtonSizes[]).reverse().map(size => {
              return <div className="flex items-center justify-center">
                  <span className="text-gray-700 text-sm mr-4">{size}</span>
                  <Button variant={variant} size={size} disabled={disabled}>
                    Button
                  </Button>
                </div>
            })}
          </div>
      })}
  </div>