import React from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Controller, useFormContext } from 'react-hook-form';
import { ExpandableLabel, Box, Margin } from '@navikt/k9-react-components';

interface TextAreaProps {
    label?: React.ReactNode;
    name: string;
    validators?: { [key: string]: (v: any) => string | boolean | undefined };
    helptext?: string;
    textareaClass?: string;
    id?: string;
    disabled?: boolean;
}

const TextArea = ({ label, name, validators, helptext, textareaClass, id, disabled }: TextAreaProps): JSX.Element => {
    const { control, errors } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            defaultValue=""
            rules={{
                validate: {
                    ...validators,
                },
            }}
            render={({ onChange, value }) => {
                if (helptext) {
                    return (
                        <>
                            <ExpandableLabel labelText={label} helptext={helptext} labelFor={name} />
                            <Box marginTop={Margin.medium}>
                                <Textarea
                                    value={value}
                                    maxLength={0}
                                    feil={errors[name]?.message}
                                    name={name}
                                    onChange={onChange}
                                    id={id}
                                    textareaClass={textareaClass}
                                    autoComplete="off"
                                    disabled={disabled}
                                />
                            </Box>
                        </>
                    );
                }
                return (
                    <Textarea
                        value={value}
                        label={label}
                        maxLength={0}
                        feil={errors[name]?.message}
                        id={id}
                        name={name}
                        onChange={onChange}
                        textareaClass={textareaClass}
                        autoComplete="off"
                        disabled={disabled}
                    />
                );
            }}
        />
    );
};

export default TextArea;
