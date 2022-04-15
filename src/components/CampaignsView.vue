<template>
  <div>
    <div class="row mb-3 d-flex">
      <label class="col-2">Filters:</label>
      <div class="col-4">
        <input class="form-control" v-model="filters.campaignName.value"/>
      </div>
      <div class="col-4">
        <select class="form-select col-4" v-model="filters.brandName.value" aria-label="Default select example">
          <option selected></option>
          <option v-for="(brand, index) in brands" :key="index" :value="brand.brandId">{{ brand.name }}</option>
        </select>
      </div>
    </div>

    <v-table
        :data="campaigns.requests"
        :filters="filters"
        class="table">
      <thead slot="head">
      <th scope="col">Status</th>
      <th scope="col">Name</th>
      <th scope="col">Type</th>
      <th scope="col">Brand</th>
      <th scope="col">Submission</th>
      <th scope="col"></th>
      </thead>
      <tbody slot="body" slot-scope="{displayData}">
      <tr v-for="campaign in displayData" :key="campaign.key">
        <th scope="row" class="d-flex flex-column">
            <span>
              <i v-if="campaign.requestStatus.requestStatusId === 6" class="fa-solid fa-check text-success"></i>
              <i v-else-if="campaign.requestStatus.requestStatusId === 2" class="fa-solid fa-xmark text-danger"></i>
              <i v-else class="fa-solid fa-hourglass text-secondary"></i>
            </span>
          {{ campaign.requestStatus.value }}
        </th>
        <th scope="row" class="align-middle">{{ campaign.campaignName }}</th>
        <th scope="row" class="align-middle">
            <span class="badge text-white" :class="campaign.advice ? 'bg-danger' : 'bg-secondary'">
              {{ campaign.advice ? 'Advice' : 'Request' }}
              </span>
        </th>
        <th scope="row" class="align-middle">{{ campaign.brand.name }}</th>
        <th scope="row" class="align-middle">
          <span>{{ submissionDate(campaign.submittedDate) }}</span>
        </th>
        <th scope="row" class="align-middle">
          <span type="button" data-bs-toggle="modal" :data-bs-target="'#modal' + campaign.requestId">
            <i class="fa-solid fa-chevron-right text-dark"></i>
          </span>

          <!-- Modal -->
          <div class="modal fade" :id="'modal' + campaign.requestId" tabindex="-1" :aria-labelledby="campaign.requestId + 'ModalLabel'" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" :id="campaign.requestId + 'ModalLabel'">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="row mb-3">
                      <div class="col-12">
                        <select class="form-select" aria-label="Default select example">
                          <option selected :value="campaign.brand.brandId">{{ campaign.brand.name }}</option>
                          <option v-for="(brand, index) in brands" :key="index" :value="brand.brandId">{{ brand.name }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-12">
                        <label for="InputCampaignName" class="form-label w-100 text-start">Campaign name*</label>
                        <input type="text" class="form-control" id="InputCampaignName" v-model="campaign.campaignName">
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-12">
                        <label for="InputCampaignDeadline" class="form-label w-100 text-start">Deadline for decision*</label>
                        <datepicker id="InputCampaignDeadline" input-class="form-control" :value="decisionDeadline(campaign.decisionDeadline)"></datepicker>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </th>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import payload from '../../data/payload-rmp.json';
import brands from '../../data/brands.json';
import moment from 'moment'
import Datepicker from 'vuejs-datepicker';


export default {
  name: 'campaigns-view',
  components: {
    Datepicker
  },
  data() {
    return {
      campaigns: payload,
      brands: brands,
      filters: {
        campaignName: { value: '', keys: ['campaignName'] },
        brandName: { value: '', keys: ['brand.name'] }
      },
      medias: [
        'Collaboration',
        'New product/innovation',
        'Print',
        'Radio',
        'Sponsorship',
        'Website',
        'Labeling/Packaging',
        'OOH',
        'Promotions',
        'Social Media',
        'TVC/Online videos',
        'Others',
      ]
    }
  },
  mounted() {
    console.log(this.campaigns)
  },
  methods: {
    submissionDate(date) {
      return moment(date).isValid() ? moment(date).format('MMMM Do YYYY') : ''
    },
    decisionDeadline(date) {
      return moment(date).isValid() ? moment(date).format('DD MMM YYYY') : ''
    }
  },
  computed: {
    // decisionDeadline(date) {
    //   return moment(date).isValid() ? moment(date).format('DD MMM YYYY') : ''
    // }
  }
}
</script>

<style>
  @import '~mdb-ui-kit/css/mdb.min.css';
</style>
