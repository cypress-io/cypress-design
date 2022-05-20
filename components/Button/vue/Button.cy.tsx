/// <reference types="cypress" />
import { mount } from 'cypress/vue';
import Button from './Button.vue';

describe('<Button />', () => {
  it('renders variants', {viewportHeight:800, viewportWidth:1000}, () => {
    mount(() => {
      return <div>
        {
          (['primary', 'secondary', 'tertiary', 
            'outline', 'pending', 'link', 'text',
            'danger', 'warning', 'info'] as const).map(variant => {
              return <div class="flex items-center">
                {(['sm', 'md', 'lg', 'lg-wide'] as const).map(size => {
                  return <div class="w-90 h-20 flex items-center justify-center">
                    <Button variant={variant} size={size} class="m-16px">
                      {variant} - {size}
                    </Button>
                  </div>
                })}
              </div>
          })
        }
      </div>
    });
  });
});
