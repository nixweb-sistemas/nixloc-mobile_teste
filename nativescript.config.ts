import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'br.com.nixloc',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;