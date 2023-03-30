# Tabs

## Summary

Describe your component here.

## Install

```bash
npm install @cypress-design/react-tabs
```

or with yarn

```bash
yarn add @cypress-design/react-tabs
```

### Usage

```tsx live
export default () => (
  <Tabs
    tabs={[
      { id: 'ov', label: 'Overview', active: true },
      { id: 'cl', label: 'Command Log' },
      { id: 'err', label: 'Errors' },
      { id: 'reco', label: 'Recommendations' },
    ]}
  />
)
```
