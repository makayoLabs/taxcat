import { TaxCalculations, TaxPayer, Income, Deductions, Credits } from '../../modules/types';
import { TaxError, TaxErrorCode, TaxErrorSeverity } from '../errors/TaxError';

export interface XMLGeneratorOptions {
  pretty?: boolean;
  validate?: boolean;
  encoding?: string;
}

export class XMLGenerator {
  private static instance: XMLGenerator;
  private readonly DEFAULT_OPTIONS: XMLGeneratorOptions = {
    pretty: true,
    validate: true,
    encoding: 'UTF-8',
  };

  private constructor() {}

  public static getInstance(): XMLGenerator {
    if (!XMLGenerator.instance) {
      XMLGenerator.instance = new XMLGenerator();
    }
    return XMLGenerator.instance;
  }

  public generateT1XML(
    taxpayer: TaxPayer,
    income: Income,
    deductions: Deductions,
    credits: Credits,
    calculations: TaxCalculations,
    options: XMLGeneratorOptions = {}
  ): string {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };

    try {
      // Build XML structure according to CRA T1 schema
      const xml = `<?xml version="1.0" encoding="${opts.encoding}"?>
<T1Return xmlns="https://apps.cra-arc.gc.ca/ebci/schema/t1/v2023">
  <Header>
    <TaxYear>${calculations.year}</TaxYear>
    <SoftwareCode>TAXCAT</SoftwareCode>
    <SoftwareVersion>1.0.0</SoftwareVersion>
  </Header>
  <Identification>
    <FirstName>${taxpayer.firstName}</FirstName>
    <LastName>${taxpayer.lastName}</LastName>
    <SIN>${taxpayer.sin}</SIN>
    <DateOfBirth>${this.formatDate(taxpayer.dateOfBirth)}</DateOfBirth>
    <LanguageOfCorrespondence>${taxpayer.language}</LanguageOfCorrespondence>
    <ResidenceProvince>${taxpayer.province}</ResidenceProvince>
  </Identification>
  <Address>
    <Line1>${taxpayer.address.line1}</Line1>
    ${taxpayer.address.line2 ? `<Line2>${taxpayer.address.line2}</Line2>` : ''}
    <City>${taxpayer.address.city}</City>
    <Province>${taxpayer.address.province}</Province>
    <PostalCode>${taxpayer.address.postalCode}</PostalCode>
  </Address>
  <Income>
    <EmploymentIncome>${this.formatAmount(calculations.income.employment)}</EmploymentIncome>
    <BusinessIncome>${this.formatAmount(calculations.income.business)}</BusinessIncome>
    <InvestmentIncome>${this.formatAmount(calculations.income.investment)}</InvestmentIncome>
    <TotalIncome>${this.formatAmount(calculations.income.taxable)}</TotalIncome>
  </Income>
  <Deductions>
    <RRSPDeduction>${this.formatAmount(deductions.rrsp.contributions)}</RRSPDeduction>
    <UnionDues>${this.formatAmount(deductions.employment.union)}</UnionDues>
    <TotalDeductions>${this.formatAmount(calculations.deductions.total)}</TotalDeductions>
  </Deductions>
  <TaxableIncome>${this.formatAmount(calculations.income.taxable)}</TaxableIncome>
  <FederalTax>
    <BasicPersonalAmount>${this.formatAmount(credits.basicPersonal)}</BasicPersonalAmount>
    <TaxOnTaxableIncome>${this.formatAmount(calculations.tax.federal)}</TaxOnTaxableIncome>
    <TotalNonRefundableCredits>${this.formatAmount(calculations.credits.nonRefundable)}</TotalNonRefundableCredits>
    <NetFederalTax>${this.formatAmount(calculations.tax.federal)}</NetFederalTax>
  </FederalTax>
  <ProvincialTax>
    <TaxOnTaxableIncome>${this.formatAmount(calculations.tax.provincial)}</TaxOnTaxableIncome>
    <TotalNonRefundableCredits>${this.formatAmount(calculations.credits.nonRefundable)}</TotalNonRefundableCredits>
    <NetProvincialTax>${this.formatAmount(calculations.tax.provincial)}</NetProvincialTax>
  </ProvincialTax>
  <Refund>${this.formatAmount(calculations.balance.refund)}</Refund>
  <BalanceOwing>${this.formatAmount(calculations.balance.owing)}</BalanceOwing>
</T1Return>`;

      return opts.pretty ? this.prettyPrintXML(xml) : xml;
    } catch (___error) =>
      throw new TaxError(
        TaxErrorCode.XML_GENERATION_ERROR,
        'Error generating T1 XML',
        TaxErrorSeverity.ERROR,
        undefined,
        { error }
      );
    }
  }

  public generateT2XML(/* ... */): string {
    throw new Error('T2 XML generation not implemented');
  }

  public generateT3XML(/* ... */): string {
    throw new Error('T3 XML generation not implemented');
  }

  public generateT4XML(/* ... */): string {
    throw new Error('T4 XML generation not implemented');
  }

  public generateT5XML(/* ... */): string {
    throw new Error('T5 XML generation not implemented');
  }

  public generateT5013XML(/* ... */): string {
    throw new Error('T5013 XML generation not implemented');
  }

  public generateRC59XML(/* ... */): string {
    throw new Error('RC59 XML generation not implemented');
  }

  public generateRC199XML(/* ... */): string {
    throw new Error('RC199 XML generation not implemented');
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private formatAmount(amount: number | string): string {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return num.toFixed(2);
  }

  private prettyPrintXML(xml: string): string {
    let formatted = '';
    let indent = 0;
    const tab = '  '; // 2 spaces

    xml.split(/>\s*</).forEach((___node) => {
      if (node.match(/^\/\w/)) {
        indent -= 1;
      }
      formatted += tab.repeat(indent) + '<' + node + '>\n';
      if (node.match(/^<?\w[^>]*[^\/]$/)) {
        indent += 1;
      }
    });

    return formatted.substring(1, formatted.length - 2);
  }
}
