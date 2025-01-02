import type { Schema, Struct } from '@strapi/strapi';

export interface AttributeAttribute extends Struct.ComponentSchema {
  collectionName: 'components_attribute_attributes';
  info: {
    displayName: 'Attribute';
    icon: 'grid';
  };
  attributes: {
    attributeId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    attributeName: Schema.Attribute.String & Schema.Attribute.Required;
    attributeType: Schema.Attribute.Enumeration<['LIST', 'FREETEXT']>;
    comparable: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface PriceFeature extends Struct.ComponentSchema {
  collectionName: 'components_price_features';
  info: {
    displayName: 'Feature';
    icon: 'bulletList';
  };
  attributes: {
    available: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PriceFreeTrial extends Struct.ComponentSchema {
  collectionName: 'components_price_free_trials';
  info: {
    displayName: 'FreeTrial';
    icon: 'archive';
  };
  attributes: {
    durationDays: Schema.Attribute.Integer;
    features: Schema.Attribute.Component<'price.feature', true>;
  };
}

export interface PriceFrequencyPricing extends Struct.ComponentSchema {
  collectionName: 'components_price_frequency_pricings';
  info: {
    displayName: 'FrequencyPricing';
    icon: 'cloud';
  };
  attributes: {
    frequency: Schema.Attribute.Enumeration<['MONTHLY', 'YEARLY']>;
    price: Schema.Attribute.Decimal;
    unit: Schema.Attribute.Enumeration<['USER', 'GB']>;
  };
}

export interface PricePrice extends Struct.ComponentSchema {
  collectionName: 'components_price_prices';
  info: {
    description: '';
    displayName: 'Price';
    icon: 'briefcase';
  };
  attributes: {
    currency: Schema.Attribute.String & Schema.Attribute.Required;
    pricingTiers: Schema.Attribute.Component<'price.tier', true>;
    region: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PriceTier extends Struct.ComponentSchema {
  collectionName: 'components_price_tiers';
  info: {
    description: '';
    displayName: 'Tier';
  };
  attributes: {
    description: Schema.Attribute.String;
    features: Schema.Attribute.Component<'price.feature', true>;
    frequencies: Schema.Attribute.Component<'price.frequency-pricing', true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    usageLimit: Schema.Attribute.Component<'usage-limit.usage-limit', false>;
  };
}

export interface UsageLimitInclude extends Struct.ComponentSchema {
  collectionName: 'components_usage_limit_includes';
  info: {
    displayName: 'Include';
    icon: 'command';
  };
  attributes: {
    description: Schema.Attribute.Text;
    type: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Decimal;
  };
}

export interface UsageLimitOverage extends Struct.ComponentSchema {
  collectionName: 'components_usage_limit_overages';
  info: {
    displayName: 'Overage';
    icon: 'collapse';
  };
  attributes: {
    description: Schema.Attribute.Text;
    pricePerUnit: Schema.Attribute.Decimal;
    type: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UsageLimitUsageLimit extends Struct.ComponentSchema {
  collectionName: 'components_usage_limit_usage_limits';
  info: {
    displayName: 'UsageLimit';
    icon: 'rocket';
  };
  attributes: {
    included: Schema.Attribute.Component<'usage-limit.include', true>;
    overage: Schema.Attribute.Component<'usage-limit.overage', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'attribute.attribute': AttributeAttribute;
      'price.feature': PriceFeature;
      'price.free-trial': PriceFreeTrial;
      'price.frequency-pricing': PriceFrequencyPricing;
      'price.price': PricePrice;
      'price.tier': PriceTier;
      'usage-limit.include': UsageLimitInclude;
      'usage-limit.overage': UsageLimitOverage;
      'usage-limit.usage-limit': UsageLimitUsageLimit;
    }
  }
}
