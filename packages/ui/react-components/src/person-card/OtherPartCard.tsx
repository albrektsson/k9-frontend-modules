import * as React from 'react';
import bemUtils from '@navikt/k9-bem-utils';
import Card from './Card';
import OnePersonOutlineGray from '../icons/OnePersonOutlineGray';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

const personCardCls = bemUtils('personCard');

interface OtherPartCardProps {
    url: string;
    fodselsnummer: string;
    name: string;
}

const OtherPartCard = ({ url, fodselsnummer, name }: OtherPartCardProps) => (
    <Card>
        <div className={personCardCls.elementWithModifier('name-gender-container', 'other-part')}>
            <OnePersonOutlineGray classname={personCardCls.element('other-part-icon')} />
            <Normaltekst className={personCardCls.element('other-part-description')}>Andre parter i saken:</Normaltekst>

            <Lenke className={personCardCls.element('selector')} href={url} target="_blank">
                <Normaltekst tag="span" className={personCardCls.element('name')}>
                    {name}
                </Normaltekst>
            </Lenke>
        </div>
        <Normaltekst tag="span">/</Normaltekst>
        <div className={personCardCls.element('container')}>
            <Normaltekst>{fodselsnummer}</Normaltekst>
        </div>
    </Card>
);

export default OtherPartCard;
