import React from 'react';
import { Stack } from '@mantine/core';
import { useAtomValue } from 'jotai/react';
import { AnyAtom } from 'src/types';
import { useDevToolsOptionsValue } from '../../../../../../../../atoms/devtools-options';
import { useUserStoreOptions } from '../../../../../../../../hooks/useUserStore';
import { getTypeOfAtomValue } from '../../../../../../../../utils/get-type-of-atom-value';
import { AtomDependentsList } from './AtomDependentsList';
import { AtomMetaDetails } from './AtomMetaDetails';
import { AtomParseDeepNestedValue } from './AtomParseDeepNestedValue';
import { AtomParseRawValueValue } from './AtomParseRawValue';

type DisplayAtomDetailsProps = {
  atom: AnyAtom;
};

export const DisplayAtomDetails = ({ atom }: DisplayAtomDetailsProps) => {
  const atomValue = useAtomValue(atom, useUserStoreOptions());
  const devtoolsOptions = useDevToolsOptionsValue();
  const atomValueType = getTypeOfAtomValue(atomValue);

  const shouldDisplayDeepNestedValue =
    devtoolsOptions.atomValueParser === 'deep-nested';

  const shouldDisplayRawValue = devtoolsOptions.atomValueParser === 'raw';

  return (
    <Stack h="auto">
      <AtomMetaDetails
        debugLabel={atom?.debugLabel}
        atomValueType={atomValueType}
      />

      {shouldDisplayRawValue && (
        <AtomParseRawValueValue
          atomValue={atomValue}
          atomValueType={atomValueType}
        />
      )}

      {shouldDisplayDeepNestedValue && (
        <AtomParseDeepNestedValue atom={atom} atomValueType={atomValueType} />
      )}

      {/* TODO add dependencies list */}

      <AtomDependentsList atom={atom} />
    </Stack>
  );
};
